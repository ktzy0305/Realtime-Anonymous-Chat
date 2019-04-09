package dev.k.websockets;

import dev.k.websockets.repositories.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    @Autowired
    ChatRepository chatRepository;

    @GetMapping("/api/get")
    public Iterable<Chat> getMessages(){
        return chatRepository.findAll();
    }
}
