package com.cs434project.service;

import com.cs434project.model.Movie;
import com.cs434project.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public List<Movie> listAll() {
        return (List<Movie>) movieRepository.findAll();

    }

    @Override
    public void addMovie(Movie m) {
        movieRepository.save(m);
    }

    public Movie getMovie(long id) {
        return movieRepository.findById(id).get();
    }

    public void deleteMovie(long id) {
        movieRepository.deleteById(id);
    }
}
