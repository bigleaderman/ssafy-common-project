package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Model.UserDto;
import com.ssafy.mafia.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("*")
public class TestController {

    @Autowired
    private TestService service;

    @RequestMapping(method = RequestMethod.GET, value = "/index")
    public List<UserDto> index(){
        return service.getAllUser();
    }

}
