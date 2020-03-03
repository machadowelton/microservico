package br.com.microservico.data;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Sala {
	
	private String id;
	
	private String apelido;
	
	private Set<Cadeira> cadeiras;
	
}
