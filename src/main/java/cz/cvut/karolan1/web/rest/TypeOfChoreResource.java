package cz.cvut.karolan1.web.rest;

import com.codahale.metrics.annotation.Timed;
import cz.cvut.karolan1.domain.TypeOfChore;
import cz.cvut.karolan1.repository.TypeOfChoreRepository;
import cz.cvut.karolan1.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TypeOfChore.
 */
@RestController
@RequestMapping("/api")
public class TypeOfChoreResource {

    private final Logger log = LoggerFactory.getLogger(TypeOfChoreResource.class);
        
    @Inject
    private TypeOfChoreRepository typeOfChoreRepository;
    
    /**
     * POST  /type-of-chores : Create a new typeOfChore.
     *
     * @param typeOfChore the typeOfChore to create
     * @return the ResponseEntity with status 201 (Created) and with body the new typeOfChore, or with status 400 (Bad Request) if the typeOfChore has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/type-of-chores",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TypeOfChore> createTypeOfChore(@Valid @RequestBody TypeOfChore typeOfChore) throws URISyntaxException {
        log.debug("REST request to save TypeOfChore : {}", typeOfChore);
        if (typeOfChore.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("typeOfChore", "idexists", "A new typeOfChore cannot already have an ID")).body(null);
        }
        TypeOfChore result = typeOfChoreRepository.save(typeOfChore);
        return ResponseEntity.created(new URI("/api/type-of-chores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("typeOfChore", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /type-of-chores : Updates an existing typeOfChore.
     *
     * @param typeOfChore the typeOfChore to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated typeOfChore,
     * or with status 400 (Bad Request) if the typeOfChore is not valid,
     * or with status 500 (Internal Server Error) if the typeOfChore couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/type-of-chores",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TypeOfChore> updateTypeOfChore(@Valid @RequestBody TypeOfChore typeOfChore) throws URISyntaxException {
        log.debug("REST request to update TypeOfChore : {}", typeOfChore);
        if (typeOfChore.getId() == null) {
            return createTypeOfChore(typeOfChore);
        }
        TypeOfChore result = typeOfChoreRepository.save(typeOfChore);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("typeOfChore", typeOfChore.getId().toString()))
            .body(result);
    }

    /**
     * GET  /type-of-chores : get all the typeOfChores.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of typeOfChores in body
     */
    @RequestMapping(value = "/type-of-chores",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<TypeOfChore> getAllTypeOfChores() {
        log.debug("REST request to get all TypeOfChores");
        List<TypeOfChore> typeOfChores = typeOfChoreRepository.findAll();
        return typeOfChores;
    }

    /**
     * GET  /type-of-chores/:id : get the "id" typeOfChore.
     *
     * @param id the id of the typeOfChore to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the typeOfChore, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/type-of-chores/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<TypeOfChore> getTypeOfChore(@PathVariable Long id) {
        log.debug("REST request to get TypeOfChore : {}", id);
        TypeOfChore typeOfChore = typeOfChoreRepository.findOne(id);
        return Optional.ofNullable(typeOfChore)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /type-of-chores/:id : delete the "id" typeOfChore.
     *
     * @param id the id of the typeOfChore to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/type-of-chores/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteTypeOfChore(@PathVariable Long id) {
        log.debug("REST request to delete TypeOfChore : {}", id);
        typeOfChoreRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("typeOfChore", id.toString())).build();
    }

}
