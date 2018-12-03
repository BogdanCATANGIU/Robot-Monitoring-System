package com.robot.v1.api;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.adapter.standard.StandardWebSocketSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.ServerEndpoint;
import java.io.BufferedReader;
import java.io.IOException;

@Controller
@CrossOrigin("*")
public class DataController {

    @Autowired
    private SocketHandler template;
//
//    @Scheduled(fixedRate = 5000)
//    public void greeting() throws InterruptedException {
//        Thread.sleep(1000); // simulated delay
//        System.out.println("scheduled");
//        this.template.convertAndSend("/name", "Hello");
//    }

    @RequestMapping(value = "/postdata", method = RequestMethod.POST)
    public void created(HttpServletRequest request, HttpServletResponse response) throws Exception {

        StringBuilder buffer = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;

        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        String data = buffer.toString();
        template.handleTextMessage(null, new TextMessage(data));
        String data2 = "{dx: 324.9532,dy: 400.6849,dz: 356.3643}";
        JSONObject jsonObj = new JSONObject(data2);
        jsonObj.get("dx");
//        return "bla";
    }

//    @SendTo("/topic/greetings")
//    public String greeting(String message) throws Exception {
//        Thread.sleep(1000);
//        return message;
//    }

}
