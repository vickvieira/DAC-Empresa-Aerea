package connections;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.AllowedListDeserializingMessageConverter;
import org.springframework.amqp.support.converter.DefaultClassMapper;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.amqp.support.converter.SimpleMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;

import constantes.RabbitmqConstantes;
import jakarta.annotation.PostConstruct;

@Component
public class RabbitMQConfig {
    private static final String NOME_EXCHANGE = "SagaClienteUsuario";

    private final AmqpAdmin amqpAdmin;
    
    public RabbitMQConfig(AmqpAdmin amqpAdmin) {
        this.amqpAdmin = amqpAdmin;
    }

    private Queue fila(String nomeFila) {
        return new Queue(nomeFila, true, false, false);
    }

    private DirectExchange trocaDireta() {
        return new DirectExchange(NOME_EXCHANGE);
    }


    private Binding relacionamento(Queue fila, DirectExchange troca) {
        return new Binding(
            fila.getName(), Binding.DestinationType.QUEUE, troca.getName(), fila.getName(), null
        );
    }

    @PostConstruct
    private void adicionaFilas() {
        Queue filaCadastro = this.fila(RabbitmqConstantes.FILA_CADASTRO);
        Queue filaCliente = this.fila(RabbitmqConstantes.FILA_CLIENTE);
        Queue filaCadastrado = this.fila(RabbitmqConstantes.FILA_CLIENTE_CADASTRADO);
        Queue filaEmail = this.fila(RabbitmqConstantes.FILA_ENVIAR_EMAIL);
        Queue filaRollback = this.fila(RabbitmqConstantes.FILA_ROLLBACK);
        
        DirectExchange troca = this.trocaDireta();

        Binding ligacaoUsuario = this.relacionamento(filaCadastro, troca);
        Binding ligacaoCliente = this.relacionamento(filaCliente, troca);
        Binding ligacaoCadastrado =  this.relacionamento(filaCadastrado, troca);
        Binding ligacaoEmail =  this.relacionamento(filaEmail, troca);
        Binding ligacaoRollback =  this.relacionamento(filaRollback, troca);
        
        this.amqpAdmin.declareQueue(filaCadastro);
        this.amqpAdmin.declareQueue(filaCliente);
        this.amqpAdmin.declareQueue(filaCadastrado);
        this.amqpAdmin.declareQueue(filaEmail);
        this.amqpAdmin.declareQueue(filaRollback);
        this.amqpAdmin.declareExchange(troca);

        this.amqpAdmin.declareBinding(ligacaoUsuario);
        this.amqpAdmin.declareBinding(ligacaoCliente);
        this.amqpAdmin.declareBinding(ligacaoCadastrado);
        this.amqpAdmin.declareBinding(ligacaoEmail);
        this.amqpAdmin.declareBinding(ligacaoRollback);
    }
}