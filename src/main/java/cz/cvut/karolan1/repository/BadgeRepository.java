package cz.cvut.karolan1.repository;

import cz.cvut.karolan1.domain.Badge;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Badge entity.
 */
public interface BadgeRepository extends JpaRepository<Badge,Long> {

    @Query("select badge from Badge badge where badge.ownedBy.login = ?#{principal.username}")
    List<Badge> findByOwnedByIsCurrentUser();

}
