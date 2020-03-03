package br.com.microservico.config;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import br.com.microservico.data.Sessao;

public class SessaoServicoConfig implements RepositoryRestConfigurer {
	
	private final Class<?>[] entities = { Sessao.class };  
	
	@Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(entities);
    }
	

}
