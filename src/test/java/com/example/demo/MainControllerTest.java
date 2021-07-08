package com.example.demo;


import com.example.demo.controller.MainController;
import com.example.demo.dto.Dto;
import com.example.demo.dto.UserDto;
import com.example.demo.service.BatchService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@SpringBootTest
//@ContextConfiguration(classes= Application.class)
@WebMvcTest(controllers = MainController.class)
@RunWith(SpringRunner.class)
public class MainControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BatchService batchService;


    @Test
    public void INSERT_DATA() throws Exception {
        // given
        Dto dto = new Dto();
        List<UserDto> list = new ArrayList<>();
        list.add(new UserDto(1L, "GyoHo", "Han", "hkh7670@gmail.com"));
        list.add(new UserDto(1L, "GilDong", "Hong", "abc@abc.com"));
        dto.setUserList(list);
        
        String content = objectMapper.writeValueAsString(dto);
        mvc.perform(post("/api/insert")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
