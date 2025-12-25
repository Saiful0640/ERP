package com.boot;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.boot.accounting.restcontroller.AccountChartController;
import com.boot.accounting.service.AccountChartService;

@WebMvcTest(AccountChartController.class)
class XyzApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AccountChartService accountChartService;

	@Test
	void contextLoads() throws Exception {
		mockMvc.perform(get("/accountchart/getAllAccountChart"))
				.andExpect(status().isOk());
	}

}
