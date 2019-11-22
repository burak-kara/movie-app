package com.cs434project.service;

import com.cs434project.entity.Movie;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MovieService {
    List<Movie> listAll();
    void addMovie(Movie m);
    Movie getMovie(long id);
    void deleteMovie(long id);
}
