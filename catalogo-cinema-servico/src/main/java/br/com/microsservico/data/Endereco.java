package br.com.microsservico.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Endereco {
	
	private String logradouro;
	
	private Integer numero;
	
	private String complemento;
	
	private String bairro;	
	
	private String cep;
	
}
