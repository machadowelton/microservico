package br.com.microsservico.data;

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
@Document("salas")
public class Sala {
	
	@Id
	private String id;
	
	private String apelido;
	
	@CreatedDate
	private Date criadoEm;
	
	@LastModifiedDate
	private Date modificadoEm;
	
	private String idCinema;
	
	private Set<Cadeira> cadeiras;
	
}
