package com.cs434project.service;

import com.cs434project.model.Movie;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface MovieService {
    public List<Movie> listAll();
    public void addMovie(Movie m);
    public Movie getMovie(long id);
    public void deleteMovie(long id);
}
