package com.example.demo;

import com.example.demo.dto.Dto;
import com.example.demo.dto.UserDto;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MainControllerTest2 extends BaseIntegrationTest{
    @Test
    public void TEST_POST() throws Exception {
        // given
        Dto dto = new Dto();
        List<UserDto> list = new ArrayList<>();
        list.add(new UserDto(1L, "GyoHo", "Han", "hkh7670@gmail.com"));
        list.add(new UserDto(1L, "GilDong", "Hong", "abc@abc.com"));
        dto.setUserList(list);

        // when
        String content = objectMapper.writeValueAsString(dto);
        ResultActions resultActions = mvc.perform(post("/api/insert")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        // then
        resultActions
                .andExpect(status().isOk());
    }
}
