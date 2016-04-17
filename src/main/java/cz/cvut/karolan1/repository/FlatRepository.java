package cz.cvut.karolan1.repository;

import cz.cvut.karolan1.domain.Flat;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Flat entity.
 */
public interface FlatRepository extends JpaRepository<Flat,Long> {

}
