package com.cs434project.controller;

import com.cs434project.entity.Movie;
import com.cs434project.service.MovieService;
import com.cs434project.utils.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/movie")// localhost:9090/movie/getAll
public class MovieController {

    // This logger can be turned into a class that supports Message-Oriented Arch. Pat. OR chain of responsibility
    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieService movieService;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<?> getAllMovies() {
        return new ResponseEntity<>(movieService.listAll(), new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/addMovie", method = RequestMethod.POST)
    public ResponseEntity insertMovie(@RequestBody Movie movie) {
        movieService.addMovie(movie);
        return new ResponseEntity(new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/getMovie/{id}", method = RequestMethod.GET)
    public <T> ResponseEntity<?> getMovie(@PathVariable String id) {
        String str = "Movie";
        T element;
        logger.info("Fetching {} with id {}", str, id);
        element = (T) movieService.getMovie(Long.valueOf(id));
        if (isNull(element)) {
            logger.error("{} with id: {} not found", str, id);
            return new ResponseEntity<>(new CustomErrorType("No such thing exists"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(element, HttpStatus.OK);
    }

    private <T> boolean isNull(T element) {
        return element == null;
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/removeMovie/{id}")
    private <T> ResponseEntity<?> removeMovie(@PathVariable String id) {
        T element;
        element = (T) movieService.getMovie(Long.valueOf(id));
        if (!isNull(element)) {
            movieService.deleteMovie(Long.valueOf(id));
            return new ResponseEntity<>(new CustomErrorType("Movie is removed."), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorType("Such Movie does not exists."), HttpStatus.NOT_FOUND);
    }

    // TODO update requests
}
