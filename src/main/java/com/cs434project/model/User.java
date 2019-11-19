package com.cs434project.model;

import javax.persistence.*;
import java.util.ArrayList;

public abstract class User {

    /* BEHAVIORS HERE*/

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @SequenceGenerator(name = "user_sequence", sequenceName = "USER_SEQ")
    private long id;

    @Column(name = "username")
    private String username;


    private ArrayList<Movie> favoriteList = new ArrayList<Movie>();
    private ArrayList<Movie> watchedList = new ArrayList<Movie>();
    private ArrayList<Movie> likedList = new ArrayList<Movie>();
    private ArrayList<Movie> dislikedList = new ArrayList<Movie>();

    public User(String username) {
        this.username = username;
    }

    public void addFavoriteMovie(Movie m){}
    public void addWatchedMovie(Movie m){}
    public void addLikedMovie(Movie m){}
    public void addDislikedMovie(Movie m){}

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

    abstract void display();
}
