package com.example.demo.controller;

import com.example.demo.dto.Dto;
import com.example.demo.dto.UserDto;
import com.example.demo.service.BatchService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class MainController {

    private final BatchService batchService;

    @GetMapping("/api/test")
    public String test() {
        return "Test";
    }

    @PostMapping("/api/insert")
    public ResponseEntity<?> insertBatch(@RequestBody Dto request) {
        batchService.insertBatch(request);
        return ResponseEntity.ok("");
    }
}
