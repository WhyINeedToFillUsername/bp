package cz.cvut.karolan1.repository;

import cz.cvut.karolan1.domain.TypeOfBadge;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TypeOfBadge entity.
 */
public interface TypeOfBadgeRepository extends JpaRepository<TypeOfBadge,Long> {

}
