import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { UserContext } from "../contexts/user-context.js";
import { EventContext } from "../contexts/event-context.js";
import io from "socket.io-client";

const socket = io();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
          <Text style={styles.roomTitle}>
            {user.username} <Text style={{ fontSize: 15 }}>in {event.title}</Text>
          </Text>
        </View>
        <ScrollView style={styles.chatMessage}>
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
                <View key={msg.timestamp} style={styles.messageRight}>
                  <Text>{msg.message_body} </Text>
                  <Text>{msg.username}</Text>
                </View>
              );
            }
          })}
          <View ref={messagesEndRef} />
        </ScrollView>
        <View style={styles.sender}>
          <TextInput
            style={styles.send}
            placeholder="enter your message"
            value={message_body}
            onChangeText={setMessage_body}
          ></TextInput>
          <Pressable onPress={sendData} style={styles.sendButton}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>Send</Text>
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
  chat: {
    width: windowWidth,
    height: Number(parseInt(windowHeight) - 150),
    backgroundColor: "grey",
    padding: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  username: {
    width: windowWidth,
    alignSelf: "flex-start",
    fontWeight: "bold",
    border: 1,
    paddingBottom: 1,
  },
  roomTitle: {
    color: "white",
    fontSize: 25,
  },
  chatMessage: {
    height: Number(parseInt(windowHeight) * 0.7),
    overflow: "auto",
    flexDirection: "column",
    width: windowWidth,
    alignContent: "flex-start",
  },
  message: {
    marginLeft: 0,
    maxWidth: 200,
    paddingLeft: 5,
  },
  messageRight: {
    marginLeft: "auto",
    marginRight: 0,
    flexDirection: "column",
    maxWidth: 200,
    paddingRight: 5,
  },
  send: {
    width: windowWidth,
    height: 50,
    flex: 4,
    border: "white",
    backgroundColor: "lightgrey",
  },
  sendButton: {
    width: Number(parseInt(windowWidth) * 0.2),
    backgroundColor: "orange",
    borderRadius: 3,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  sender: {
    flexDirection: "row",
  },
});
