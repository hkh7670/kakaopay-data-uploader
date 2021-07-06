package com.example.demo.repository;

import com.example.demo.entity.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface JdbcRepository {
    void saveAll(List<UserEntity> items);
}
