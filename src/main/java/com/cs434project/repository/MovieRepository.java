package com.cs434project.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cs434project.model.Movie;


@Repository
public interface MovieRepository extends CrudRepository<Movie, Long> {


}
