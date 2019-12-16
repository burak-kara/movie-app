package com.cs434project.controller;

import com.cs434project.entity.User;
import com.cs434project.service.UserService;
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

import java.util.List;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    // This logger can be turned into a class that supports Message-Oriented Arch. Pat.
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.listAll(), new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public ResponseEntity insertUser(@RequestBody User user){
        userService.addUser(user);
        return new ResponseEntity( new HttpHeaders(), HttpStatus.OK);
    }

    @RequestMapping(value = "/getUser/{id}", method = RequestMethod.GET)
    public <T> ResponseEntity<?> getUser(@PathVariable String id){
        String str = "User";
        T element;
        logger.info("Fetching {} with id {}", str, id);
        element = (T) userService.getUser(Long.valueOf(id));
        if (isNull(element)) {
            logger.error("{} with id: {} not found", str, id);
            return new ResponseEntity<>(new CustomErrorType("No such thing exists"), HttpStatus.NOT_FOUND );
        }
        return new ResponseEntity<>(element, HttpStatus.OK);
    }

    private <T> boolean isNull(T element){
        return element == null;
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/removeUser/{id}")
    private <T> ResponseEntity<?> removeUser(@PathVariable String id){
        T element;
        element = (T) userService.getUser(Long.valueOf(id));
        if(!isNull(element)){
            userService.deleteUser(Long.valueOf(id));
            return new ResponseEntity<>(new CustomErrorType("User is removed."), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorType("Such User does not exists."), HttpStatus.NOT_FOUND);
    }

    // TODO update requests
}

