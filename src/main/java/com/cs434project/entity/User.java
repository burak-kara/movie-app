package com.cs434project.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "user")
public class User {

    /* BEHAVIORS HERE*/

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @SequenceGenerator(name = "user_sequence", sequenceName = "USER_SEQ")
    @Getter @Setter private long id;

    @NotNull
    @Size(max = 16)
    @Column
    @Getter @Setter private String username;

    @NotNull
    @Size(max = 32)
    @Column
    @Getter @Setter private String name;

    @NotNull
    @Size(max = 32)
    @Column
    @Getter @Setter private String surname;


/*    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "movie")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Movie> favoriteList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "movie")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Movie> watchedList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "movie")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Movie> likedList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "movie")
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Movie> dislikedList = new ArrayList<>();*/

}
