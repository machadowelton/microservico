package br.com.microsservico.data;

import java.util.Date;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("filmes")
public class Filme {
	
	@Id
	private String id;
	
	private String titulo;
	
	@CreatedDate
	private Date criadoEm;
	
	@LastModifiedDate
	private Date modificadoEm;
	
	private String sinopse;
	
	private Integer duracaoMinutos;
	
	private Date dataLancamento;
	
	private ESimNao estreia;
	
	private ESimNao ativo;
	
	private Set<String> categorias;
	
}
