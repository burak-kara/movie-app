package com.cs434project.service;

import com.cs434project.model.Movie;

import java.util.Date;
import java.util.List;

public interface MovieService {

    public List<Movie> getMovie(long id);
    public void addMovie(String movieName, String date, String director);
}
