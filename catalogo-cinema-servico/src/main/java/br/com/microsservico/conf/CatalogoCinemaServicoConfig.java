package br.com.microsservico.conf;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import br.com.microsservico.data.Cinema;
import br.com.microsservico.data.Sala;

@Configuration
public class CatalogoCinemaServicoConfig implements RepositoryRestConfigurer {
	
	private final Class<?>[] entities = { Cinema.class, Sala.class };
	
	@Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        //config.exposeIdsFor(Cinema.class, Sala.class);
		config.exposeIdsFor(entities);
    }
	
}
