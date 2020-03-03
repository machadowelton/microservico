package br.com.microservico.data;

import java.util.Date;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("sessoes")
public class Sessao {
	
	@Id
	private String id;
	
	@CreatedDate
	private Date criadoEm;
	
	@LastModifiedDate
	private Date modificadoEm;
	
	private Date dataHora;
	
	private Filme filme;
	
	private Set<Ingresso> ingressos;
	
	private Cinema cinema;
	
	private Sala sala;
	
	
}
