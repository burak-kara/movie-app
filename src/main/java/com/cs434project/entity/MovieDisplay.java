package com.cs434project.entity;

import javax.persistence.ManyToOne;

public class MovieDisplay implements Observer {

    @ManyToOne
    private Movie movie;

    @Override
    public void update(Movie movie) {

    }
}
