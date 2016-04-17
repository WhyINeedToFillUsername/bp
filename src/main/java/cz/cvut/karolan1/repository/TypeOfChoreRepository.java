package cz.cvut.karolan1.repository;

import cz.cvut.karolan1.domain.TypeOfChore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TypeOfChore entity.
 */
public interface TypeOfChoreRepository extends JpaRepository<TypeOfChore,Long> {

}
