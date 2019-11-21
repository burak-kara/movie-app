package com.cs434project.model;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
public class User {

    /* BEHAVIORS HERE*/

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @SequenceGenerator(name = "user_sequence", sequenceName = "USER_SEQ")
    private long id;

    @NotNull
    @Size(max = 65)
    @Column(name = "username")
    private String username;

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


/*    public User(String username) {
        this.username = username;
    }*/
/*
    public void addFavoriteMovie(Movie m){favoriteList.add(m);}
    public void addWatchedMovie(Movie m){watchedList.add(m);}
    public void addLikedMovie(Movie m){likedList.add(m);}
    public void addDislikedMovie(Movie m){dislikedList.add(m);}

    public void removeFavoriteMovie(Movie m){favoriteList.remove(m);}
    public void removeWatchedMovie(Movie m){watchedList.remove(m);}
    public void removeLikedMovie(Movie m){likedList.remove(m);}
    public void removeDislikedMovie(Movie m){dislikedList.remove(m);}*/

    public String getUsername() {
        return username;
    }

/*    public List<Movie> getFavoriteList() {
        return favoriteList;
    }

    public List<Movie> getWatchedList() {
        return watchedList;
    }

    public List<Movie> getLikedList() {
        return likedList;
    }

    public List<Movie> getDislikedList() {
        return dislikedList;
    }*/

    public void setId(long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

/*    public void setFavoriteList(List<Movie> favoriteList) {
        this.favoriteList = favoriteList;
    }

    public void setWatchedList(List<Movie> watchedList) {
        this.watchedList = watchedList;
    }

    public void setLikedList(List<Movie> likedList) {
        this.likedList = likedList;
    }

    public void setDislikedList(List<Movie> dislikedList) {
        this.dislikedList = dislikedList;
    }*/

    public long getId() {
        return id;
    }
}
