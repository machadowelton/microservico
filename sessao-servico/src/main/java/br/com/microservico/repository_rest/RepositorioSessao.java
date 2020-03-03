package br.com.microservico.repository_rest;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.microservico.data.Sessao;

@RepositoryRestResource(collectionResourceRel = "sessoes", path = "sessoes")
public interface RepositorioSessao extends MongoRepository<Sessao, String>{
	
}
