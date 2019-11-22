package com.cs434project.controller;

import com.cs434project.model.Movie;
import com.cs434project.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class AppController {

    @Autowired
    private MovieService movieService;


    // Handlers
    @RequestMapping(value = "/movies", method = RequestMethod.GET)
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity<List<Movie>>(movieService.listAll(), new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/movieEntry", method = RequestMethod.POST)
    public ResponseEntity insertMovie(@RequestBody Movie movie){
        movieService.addMovie(movie);
        return new ResponseEntity( new HttpHeaders(), HttpStatus.OK);
    }


}
