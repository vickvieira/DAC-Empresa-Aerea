package dto;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "voos")
public class VooDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "codigo_voo", length = 10, nullable = false, unique = true)
    private String codigoVoo;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @Column(name = "aeroporto_origem", length = 3, nullable = false)
    private String aeroportoOrigem;

    @Column(name = "aeroporto_destino", length = 3, nullable = false)
    private String aeroportoDestino;

    @Column(name = "valor_passagem", nullable = false)
    private Double valorPassagem;

    @Column(name = "quantidade_poltronas_total", nullable = false)
    private Integer quantidadePoltronasTotal;

    @Column(name = "quantidade_poltronas_ocupadas", nullable = false)
    private Integer quantidadePoltronasOcupadas;

    public VooDTO() {}

    public VooDTO(String codigoVoo, LocalDateTime dataHora, String aeroportoOrigem, String aeroportoDestino,
                  Double valorPassagem, Integer quantidadePoltronasTotal, Integer quantidadePoltronasOcupadas) {
        this.codigoVoo = codigoVoo;
        this.dataHora = dataHora;
        this.aeroportoOrigem = aeroportoOrigem;
        this.aeroportoDestino = aeroportoDestino;
        this.valorPassagem = valorPassagem;
        this.quantidadePoltronasTotal = quantidadePoltronasTotal;
        this.quantidadePoltronasOcupadas = quantidadePoltronasOcupadas;
    }

    // Getters e Setters
    public String getCodigoVoo() {
        return codigoVoo;
    }

    public void setCodigoVoo(String codigoVoo) {
        this.codigoVoo = codigoVoo;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getAeroportoOrigem() {
        return aeroportoOrigem;
    }

    public void setAeroportoOrigem(String aeroportoOrigem) {
        this.aeroportoOrigem = aeroportoOrigem;
    }

    public String getAeroportoDestino() {
        return aeroportoDestino;
    }

    public void setAeroportoDestino(String aeroportoDestino) {
        this.aeroportoDestino = aeroportoDestino;
    }

    public Double getValorPassagem() {
        return valorPassagem;
    }

    public void setValorPassagem(Double valorPassagem) {
        this.valorPassagem = valorPassagem;
    }

    public Integer getQuantidadePoltronasTotal() {
        return quantidadePoltronasTotal;
    }

    public void setQuantidadePoltronasTotal(Integer quantidadePoltronasTotal) {
        this.quantidadePoltronasTotal = quantidadePoltronasTotal;
    }

    public Integer getQuantidadePoltronasOcupadas() {
        return quantidadePoltronasOcupadas;
    }

    public void setQuantidadePoltronasOcupadas(Integer quantidadePoltronasOcupadas) {
        this.quantidadePoltronasOcupadas = quantidadePoltronasOcupadas;
    }
}