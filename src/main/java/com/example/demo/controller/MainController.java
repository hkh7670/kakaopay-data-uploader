package com.example.demo.controller;

import com.example.demo.dto.Dto;
import com.example.demo.service.BatchService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class MainController {

    private final BatchService batchService;

    @PostMapping("/api/insert")
    public ResponseEntity<?> insertBatch(@RequestBody Dto request) {
        return ResponseEntity.ok(batchService.insertBatch(request));
    }
}
