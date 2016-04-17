package cz.cvut.karolan1.repository;

import cz.cvut.karolan1.domain.Chore;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Chore entity.
 */
public interface ChoreRepository extends JpaRepository<Chore,Long> {

    @Query("select chore from Chore chore where chore.isDoneBy.login = ?#{principal.username}")
    List<Chore> findByIsDoneByIsCurrentUser();

}
