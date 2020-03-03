package br.com.microsservico.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cadeira {
	
	private Integer numero;
	
	private ESimNao ativa;
	
}
