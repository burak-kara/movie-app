package com.cs434project.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cs434project.model.Movie;


@Repository
public interface MovieRepository extends CrudRepository<Movie, Long> {
    List<Movie> findMoviebyId(long id);
}
