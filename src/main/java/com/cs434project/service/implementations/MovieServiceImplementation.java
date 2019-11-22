package com.cs434project.service.implementations;

import com.cs434project.entity.Movie;
import com.cs434project.repository.MovieRepository;
import com.cs434project.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImplementation implements MovieService {

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
        if(movieRepository.findById(id).isPresent()){ return movieRepository.findById(id).get(); }
        return null; // this can be replaced by the null obj from the DB. (aka. Null Pattern)
    }

    public void deleteMovie(long id) {
        movieRepository.deleteById(id);
    }
}
