package com.cs434project.service;

import com.cs434project.model.Movie;
import com.cs434project.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MovieServiceImpl implements MovieService {

    @Autowired
    MovieRepository movieRepository;

    @Override
    public List<Movie> getMovie(long id) {
        return movieRepository.findMoviebyId(id);
    }

    @Override
    public void addMovie(String movieName, String date, String director) {

    }
}
