package cz.cvut.karolan1.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Flat.
 */
@Entity
@Table(name = "flat")
public class Flat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "date_created")
    private ZonedDateTime dateCreated;

    @ManyToOne
    private Flat friendsOf;

    @OneToOne
    @JoinColumn(unique = true)
    private User hasAdmin;

    @ManyToOne
    private User hasResident;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(ZonedDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Flat getFriendsOf() {
        return friendsOf;
    }

    public void setFriendsOf(Flat flat) {
        this.friendsOf = flat;
    }

    public User getHasAdmin() {
        return hasAdmin;
    }

    public void setHasAdmin(User user) {
        this.hasAdmin = user;
    }

    public User getHasResident() {
        return hasResident;
    }

    public void setHasResident(User user) {
        this.hasResident = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Flat flat = (Flat) o;
        if(flat.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, flat.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Flat{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", dateCreated='" + dateCreated + "'" +
            '}';
    }
}
