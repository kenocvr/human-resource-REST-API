package com.humanresources.prod.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link RegionSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class RegionSearchRepositoryMockConfiguration {

    @MockBean
    private RegionSearchRepository mockRegionSearchRepository;

}
