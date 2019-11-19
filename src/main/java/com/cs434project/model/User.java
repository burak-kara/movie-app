package com.cs434project.model;

import javax.persistence.*;
import java.util.ArrayList;

public class User {

    /* BEHAVIORS HERE*/

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @SequenceGenerator(name = "user_sequence", sequenceName = "USER_SEQ")
    private long id;

    @Column(name = "username")
    private String username;


    @ElementCollection
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "favorite")
    private ArrayList<Movie> favoriteList = new ArrayList<>();

    @ElementCollection
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "watched")
    private ArrayList<Movie> watchedList = new ArrayList<>();

    @ElementCollection
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "liked")
    private ArrayList<Movie> likedList = new ArrayList<>();

    @ElementCollection
    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "disliked")
    private ArrayList<Movie> dislikedList = new ArrayList<>();


    public User(String username) {
        this.username = username;
    }

    public void addFavoriteMovie(Movie m){favoriteList.add(m);}
    public void addWatchedMovie(Movie m){watchedList.add(m);}
    public void addLikedMovie(Movie m){likedList.add(m);}
    public void addDislikedMovie(Movie m){dislikedList.add(m);}

    public void removeFavoriteMovie(Movie m){favoriteList.remove(m);}
    public void removeWatchedMovie(Movie m){watchedList.remove(m);}
    public void removeLikedMovie(Movie m){likedList.remove(m);}
    public void removeDislikedMovie(Movie m){dislikedList.remove(m);}

    public String getUsername() {
        return username;
    }

    public ArrayList<Movie> getFavoriteList() {
        return favoriteList;
    }

    public ArrayList<Movie> getWatchedList() {
        return watchedList;
    }

    public ArrayList<Movie> getLikedList() {
        return likedList;
    }

    public ArrayList<Movie> getDislikedList() {
        return dislikedList;
    }

}
