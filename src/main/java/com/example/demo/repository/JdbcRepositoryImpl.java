package com.example.demo.repository;

import com.example.demo.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class JdbcRepositoryImpl implements JdbcRepository {
    private final JdbcTemplate jdbcTemplate;

    @Value("${batchSize}")
    private int batchSize;

    @Override
    public void saveAll(List<UserEntity> items) {
        System.out.println("batchSize: " + batchSize);
        int batchCount = 0;
        List<UserEntity> subItems = new ArrayList<>();
        for (int i = 0; i < items.size(); i++) {
            subItems.add(items.get(i));
            if ((i + 1) % batchSize == 0) {
                batchCount = batchInsert(batchCount, subItems);
            }
        }
        if (!subItems.isEmpty()) {
            batchCount = batchInsert(batchCount, subItems);
        }
        System.out.println("batchCount: " + batchCount);
    }

    private int batchInsert(int batchCount, List<UserEntity> subItems) {
        // jdbcTemplate의 batchUpdate 함수를 이용하여 insert할 데이터들을 batchSize로 묶어서 한번에 insert
        jdbcTemplate.batchUpdate("INSERT INTO USER_INFO (`ID`, `FIRSTNAME`, `LASTNAME`, `EMAIL`) VALUES (?, ?, ?, ?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, subItems.get(i).getId());
                        ps.setString(2, subItems.get(i).getFirstname());
                        ps.setString(3, subItems.get(i).getLastname());
                        ps.setString(4, subItems.get(i).getEmail());
                    }
                    @Override
                    public int getBatchSize() {
                        return subItems.size();
                    }
                });
        subItems.clear();
        batchCount++;
        return batchCount;
    }
}
