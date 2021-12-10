import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Pressable, TextInput } from "react-native";
import { UserContext } from "../contexts/user-context.js";
import { EventContext } from "../contexts/event-context.js";
import io from "socket.io-client";

const socket = io();

export default function CommentCard() {
  const { user, setUser } = useContext(UserContext);
  const { event, setEvent } = useContext(EventContext);
  const [messages, setMessages] = useState([]);
  const [message_body, setMessage_body] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let username = user.username;
    let eventTitle = event.title;
    if (user.username !== "" && event.title !== "") {
      socket.emit("joinRoom", { username, eventTitle });
    } else {
      let username = "anonymous";
      let eventTitle = "Lobby";
      socket.emit("joinRoom", { username, eventTitle });
    }

    socket.on("message", (data) => {
      let temp = messages;

      temp.push({
        username: data.username,
        message_body: data.message_body,
        timestamp: new Date(),
      });
      setMessages([...temp]);
    });

    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [socket, messages]);
  console.log(message_body, "<<<<<<<<<<<<<<<<");

  const sendData = () => {
    if (message_body !== "") {
      socket.emit("chat", message_body);
      setMessage_body("");
    }
  };

  //   const scrollToBottom = () => {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   };

  //   useEffect(scrollToBottom, [messages]);

  console.log(messages, "messages");

  return (
    <View style={styles.chatRoomContainer}>
      <View style={styles.chat}>
        <View style={styles.username}>
          <Text sytle={styles.roomTitle}>
            {user.username} <Text style={{ fontSize: 10 }}>in {event.title}</Text>
          </Text>
        </View>
        <View style={styles.chatMessage}>
          {messages.map((msg) => {
            if (msg.username === username) {
              return (
                <View key={msg.timestamp} style={styles.message}>
                  <Text>{msg.message_body}</Text>
                  <Text>{msg.username}</Text>
                </View>
              );
            } else {
              return (
                <View key={msg.timestamp} style={styles.message - right}>
                  <Text>{msg.message_body} </Text>
                  <Text>{msg.username}</Text>
                </View>
              );
            }
          })}
          <View ref={messagesEndRef} />
        </View>
        <View style={styles.send}>
          <TextInput
            placeholder="enter your message"
            value={message_body}
            onChangeText={setMessage_body}
          ></TextInput>
          <Pressable onPress={sendData}>
            <Text>Send</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatRoomContainer: {
    flexDirection: "column",
  },
});
