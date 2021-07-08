package com.example.demo.service;

import com.example.demo.dto.Dto;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.JdbcRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BatchServiceImpl implements BatchService{

    private final UserRepository userRepository;
    private final JdbcRepository jdbcRepository;


    @Override
    public void insertBatch(Dto request) {
        List<UserEntity> entities = request.getUserList()
                                .stream()
                                .map(UserDto::toEntity)
                                .collect(Collectors.toList());
//        userRepository.saveAll(entities);
        jdbcRepository.saveAll(entities);




//        jdbcTemplate.batchUpdate("INSERT INTO USER_INFO (`ID`, `FIRSTNAME`, `LASTNAME`, `EMAIL`) VALUES (?, ?, ?, ?)",
//                new BatchPreparedStatementSetter() {
//                    @Override
//                    public void setValues(PreparedStatement ps, int i) throws SQLException {
//                        ps.setLong(1, entities.get(i).getId());
//                        ps.setString(2, entities.get(i).getFirstname());
//                        ps.setString(3, entities.get(i).getLastname());
//                        ps.setString(4, entities.get(i).getEmail());
//                    }
//
//                    @Override
//                    public int getBatchSize() {
//                        return 0;
//                    }
//                });
    }



}
