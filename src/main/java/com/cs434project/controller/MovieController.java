package com.cs434project.controller;

import com.cs434project.entity.Movie;
import com.cs434project.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping(value = "/movie")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity<List<Movie>>(movieService.listAll(), new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/addMovie", method = RequestMethod.POST)
    public ResponseEntity insertMovie(@RequestBody Movie movie){
        movieService.addMovie(movie);
        return new ResponseEntity( new HttpHeaders(), HttpStatus.OK);
    }
}
