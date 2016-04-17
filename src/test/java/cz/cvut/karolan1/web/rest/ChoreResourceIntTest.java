package cz.cvut.karolan1.web.rest;

import cz.cvut.karolan1.Bp250App;
import cz.cvut.karolan1.domain.Chore;
import cz.cvut.karolan1.repository.ChoreRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the ChoreResource REST controller.
 *
 * @see ChoreResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Bp250App.class)
@WebAppConfiguration
@IntegrationTest
public class ChoreResourceIntTest {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneId.of("Z"));


    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_DATE_STR = dateTimeFormatter.format(DEFAULT_DATE);

    @Inject
    private ChoreRepository choreRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restChoreMockMvc;

    private Chore chore;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ChoreResource choreResource = new ChoreResource();
        ReflectionTestUtils.setField(choreResource, "choreRepository", choreRepository);
        this.restChoreMockMvc = MockMvcBuilders.standaloneSetup(choreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        chore = new Chore();
        chore.setDate(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createChore() throws Exception {
        int databaseSizeBeforeCreate = choreRepository.findAll().size();

        // Create the Chore

        restChoreMockMvc.perform(post("/api/chores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(chore)))
                .andExpect(status().isCreated());

        // Validate the Chore in the database
        List<Chore> chores = choreRepository.findAll();
        assertThat(chores).hasSize(databaseSizeBeforeCreate + 1);
        Chore testChore = chores.get(chores.size() - 1);
        assertThat(testChore.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void getAllChores() throws Exception {
        // Initialize the database
        choreRepository.saveAndFlush(chore);

        // Get all the chores
        restChoreMockMvc.perform(get("/api/chores?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(chore.getId().intValue())))
                .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE_STR)));
    }

    @Test
    @Transactional
    public void getChore() throws Exception {
        // Initialize the database
        choreRepository.saveAndFlush(chore);

        // Get the chore
        restChoreMockMvc.perform(get("/api/chores/{id}", chore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(chore.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE_STR));
    }

    @Test
    @Transactional
    public void getNonExistingChore() throws Exception {
        // Get the chore
        restChoreMockMvc.perform(get("/api/chores/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChore() throws Exception {
        // Initialize the database
        choreRepository.saveAndFlush(chore);
        int databaseSizeBeforeUpdate = choreRepository.findAll().size();

        // Update the chore
        Chore updatedChore = new Chore();
        updatedChore.setId(chore.getId());
        updatedChore.setDate(UPDATED_DATE);

        restChoreMockMvc.perform(put("/api/chores")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedChore)))
                .andExpect(status().isOk());

        // Validate the Chore in the database
        List<Chore> chores = choreRepository.findAll();
        assertThat(chores).hasSize(databaseSizeBeforeUpdate);
        Chore testChore = chores.get(chores.size() - 1);
        assertThat(testChore.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void deleteChore() throws Exception {
        // Initialize the database
        choreRepository.saveAndFlush(chore);
        int databaseSizeBeforeDelete = choreRepository.findAll().size();

        // Get the chore
        restChoreMockMvc.perform(delete("/api/chores/{id}", chore.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Chore> chores = choreRepository.findAll();
        assertThat(chores).hasSize(databaseSizeBeforeDelete - 1);
    }
}
