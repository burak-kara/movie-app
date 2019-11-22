package com.cs434project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cs434project.entity.Movie;


@Repository
public interface MovieRepository extends CrudRepository<Movie, Long> {
    // TODO
}
