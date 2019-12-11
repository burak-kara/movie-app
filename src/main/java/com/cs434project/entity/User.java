package com.cs434project.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {

    /* BEHAVIORS HERE*/

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @SequenceGenerator(name = "user_sequence", sequenceName = "USER_SEQ")
    private long id;

    @NotNull
    @Size(max = 16)
    @Column
    private String username;

    @NotNull
    @Size(max = 32)
    @Column
    private String name;

    @NotNull
    @Size(max = 32)
    @Column
    private String surname;


    @ElementCollection
    @CollectionTable(name = "favorite_list", joinColumns = @JoinColumn(name = "id"))
    private List<Movie> favoriteList = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "watched_list", joinColumns = @JoinColumn(name = "id"))
    private List<Movie> watchedList = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "liked_list", joinColumns = @JoinColumn(name = "id"))
    private List<Movie> likedList = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "disliked_list", joinColumns = @JoinColumn(name = "id"))
    private List<Movie> dislikedList = new ArrayList<>();

    public void addMovieToFavoriteList(Movie m){favoriteList.add(m);}
    public void addMovieToWatchedList(Movie m){watchedList.add(m);}
    public void addMovieToLikedList(Movie m){likedList.add(m);}
    public void addMovieToDislikedList(Movie m){dislikedList.add(m);}

    public void removeMovieToFavoriteList(Movie m){favoriteList.remove(m);}
    public void removeMovieToWatchedList(Movie m){watchedList.remove(m);}
    public void removeMovieToLikedList(Movie m){likedList.remove(m);}
    public void removeMovieToDislikedList(Movie m){dislikedList.remove(m);}

}
