package com.cs434project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cs434project.entity.User;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    // TODO
}
