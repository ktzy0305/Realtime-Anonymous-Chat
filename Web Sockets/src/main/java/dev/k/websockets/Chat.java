package dev.k.websockets;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatID;

    private String content;

    public Chat() {
    }

    public Chat(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
