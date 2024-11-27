package dev.gethealthy.app.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping(path = "/world")
    public ResponseEntity<String> sayHelloWorld(){
        return ResponseEntity.ok("Hello World!");
    }
}
