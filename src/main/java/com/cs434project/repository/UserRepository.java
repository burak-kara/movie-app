package com.cs434project.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cs434project.model.User;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
