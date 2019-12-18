package com.cs434project.entity;

import javax.persistence.Column;
import javax.persistence.Table;

@Table
public class FavoriteMovies {

    @Column
    String userID;

    @Column
    String movieID;

    @Column
    String movieName;


}
