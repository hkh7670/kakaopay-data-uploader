package com.example.demo.dto;


import com.example.demo.entity.UserEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;

    public UserEntity toEntity() {
        return UserEntity.builder()
                .id(id)
                .firstname(firstname)
                .lastname(lastname)
                .email(email)
                .build();
    }
}
