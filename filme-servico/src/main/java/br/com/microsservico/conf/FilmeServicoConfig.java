package br.com.microsservico.conf;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import br.com.microsservico.data.Filme;

@Configuration
public class FilmeServicoConfig implements RepositoryRestConfigurer {
	
	private final Class<?>[] entities = { Filme.class };
	
	@Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(entities);
        config.setReturnBodyForPutAndPost(true);
    }
	
}
