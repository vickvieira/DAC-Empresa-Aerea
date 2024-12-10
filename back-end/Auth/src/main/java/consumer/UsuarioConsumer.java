package consumer;

import constantes.RabbitmqConstantes;
import dto.UserCliente;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;
import service.AuthService;

@Component
public class UsuarioConsumer {
	
	@Autowired
    private AuthService authService;
	
	@RabbitListener(queues = RabbitmqConstantes.FILA_CADASTRO)
	public void consumidor(UserCliente user) {
	    System.out.println("Mensagem recebida no Auth: " + user);
	    try {
	        System.out.println("Processando usuário: " + user.getUserRequisitionDTO());
	        authService.cadastrarUsuario(user.getUserRequisitionDTO());
	        System.out.println("Processamento concluído com sucesso para: " + user.getUserRequisitionDTO());
	    } catch (Exception e) {
	        System.err.println("Erro ao processar usuário: " + e.getMessage());
	        e.printStackTrace();
	    }
	}
}