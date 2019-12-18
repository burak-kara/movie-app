package com.cs434project.service;

import com.cs434project.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    List<User> listAll();
    void addUser(User m);
    User getUser(long id);
    void deleteUser(long id);
}
