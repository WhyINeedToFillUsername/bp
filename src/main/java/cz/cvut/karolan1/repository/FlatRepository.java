package cz.cvut.karolan1.repository;

import cz.cvut.karolan1.domain.Flat;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Flat entity.
 */
public interface FlatRepository extends JpaRepository<Flat,Long> {

    @Query("select distinct flat from Flat flat left join fetch flat.friends")
    List<Flat> findAllWithEagerRelationships();

    @Query("select flat from Flat flat left join fetch flat.friends where flat.id =:id")
    Flat findOneWithEagerRelationships(@Param("id") Long id);
}
