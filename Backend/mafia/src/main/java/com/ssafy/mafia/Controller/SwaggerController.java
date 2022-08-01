package com.ssafy.mafia.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/swagger")
public class SwaggerController {
    @GetMapping
    public String api(){ return "redirect:/swagger-ui.html"; }
}
