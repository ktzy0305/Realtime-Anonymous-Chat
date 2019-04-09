package dev.k.websockets;

import dev.k.websockets.repositories.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

@Controller
public class ChatController {
    @Autowired
    ChatRepository chatRepository;

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Chat greeting(HelloMessage message) throws Exception {
        Thread.sleep(500); // simulated delay
        chatRepository.save(new Chat(HtmlUtils.htmlEscape(message.getName())));
        return new Chat(HtmlUtils.htmlEscape(message.getName()));
    }
}
