package com.cs434project.service.implementations;

import com.cs434project.entity.User;
import com.cs434project.repository.UserRepository;
import com.cs434project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> listAll() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public void addUser(User m) {
        userRepository.save(m);
    }

    @Override
    public User getUser(long id) {
        if(userRepository.findById(id).isPresent()){ return userRepository.findById(id).get(); }
        return null; // this can be replaced by the null obj from the DB. (aka. Null Pattern)
    }

    @Override
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
}
