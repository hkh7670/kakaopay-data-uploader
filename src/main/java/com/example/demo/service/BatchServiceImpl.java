package com.example.demo.service;

import com.example.demo.dto.Dto;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.JdbcRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class BatchServiceImpl implements BatchService{

    private final UserRepository userRepository;
    private final JdbcRepository jdbcRepository;


    @Override
    public int insertBatch(Dto request) {
        List<UserEntity> entities = request.getUserList()
                                .stream()
                                .map(UserDto::toEntity)
                                .collect(Collectors.toList());
//        userRepository.saveAll(entities);
        jdbcRepository.saveAll(entities);
        return entities.size();
    }



}
