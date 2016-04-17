package cz.cvut.karolan1.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Badge.
 */
@Entity
@Table(name = "badge")
public class Badge implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "earned_at")
    private ZonedDateTime earnedAt;

    @ManyToOne
    private User ownedBy;

    @OneToMany(mappedBy = "badge")
    @JsonIgnore
    private Set<TypeOfBadge> isOfTypes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getEarnedAt() {
        return earnedAt;
    }

    public void setEarnedAt(ZonedDateTime earnedAt) {
        this.earnedAt = earnedAt;
    }

    public User getOwnedBy() {
        return ownedBy;
    }

    public void setOwnedBy(User user) {
        this.ownedBy = user;
    }

    public Set<TypeOfBadge> getIsOfTypes() {
        return isOfTypes;
    }

    public void setIsOfTypes(Set<TypeOfBadge> typeOfBadges) {
        this.isOfTypes = typeOfBadges;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Badge badge = (Badge) o;
        if(badge.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, badge.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Badge{" +
            "id=" + id +
            ", earnedAt='" + earnedAt + "'" +
            '}';
    }
}
