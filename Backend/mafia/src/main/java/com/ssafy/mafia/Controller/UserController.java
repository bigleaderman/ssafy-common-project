package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.UserDto;
import com.ssafy.mafia.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/join")
    public ResponseEntity<?> joinUser(@RequestBody UserDto userDto){
        System.out.println(userDto.toString());
        User user = new User(userDto.getEmail(), userDto.getPassword());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
