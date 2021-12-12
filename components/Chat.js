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
import { getHistory } from "../utils/YizApi";

const socket = io("localhost:8000");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Chat() {
  const { user, setUser } = useContext(UserContext);
  const { event, setEvent } = useContext(EventContext);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  const scrollRef = useRef();
  let username = user.username;
  let title = event.title;

  getHistory(title).then(({ data }) => {
    console.log(data);
    setMessages([...data.messages]);
  });
  useEffect(() => {
    if (user.username !== "" && event.title !== "") {
      socket.emit("joinRoom", { username, title });
    } else {
      let username = "anonymous";
      let title = "Lobby";
      socket.emit("joinRoom", { username, title });
    }

    socket.on("message", (data) => {
      let temp = messages;

      temp.push({
        username: data.username,
        messageBody: data.messageBody,
        dateCreated: new Date(),
      });
      setMessages([...temp]);
    });
  }, [setMessages]);

  console.log(messageBody, "<<<<<<<<<<<<<<<<");

  const sendData = () => {
    if (messageBody !== "") {
      socket.emit("chat", messageBody);
      setMessageBody("");
    }
  };

  console.log(messages, "messages");

  return (
    <View style={styles.chatRoomContainer}>
      <View style={styles.chat}>
        <View style={styles.username}>
          <Text style={styles.roomTitle}>
            {user.username} <Text style={{ fontSize: 16 }}>in {event.title}</Text>
          </Text>
        </View>
        <ScrollView
          ref={scrollRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            scrollRef.current.scrollToEnd({ animated: true });
          }}
          style={styles.chatMessage}
        >
          {messages.map((msg) => {
            if (msg.username === username) {
              return (
                <View key={msg._id} style={styles.message}>
                  <Text
                    style={{
                      backgroundColor: "orange",
                      fontSize: 20,
                      borderRadius: 5,
                      padding: 3,
                    }}
                  >
                    {msg.messageBody}
                  </Text>
                  <Text style={{ fontStyle: "italic" }}>by {msg.username}</Text>
                </View>
              );
            } else {
              return (
                <View key={msg._id} style={styles.messageRight}>
                  <Text
                    style={{
                      backgroundColor: "purple",
                      fontSize: 20,
                      borderRadius: 5,
                      padding: 3,
                      color: "white",
                    }}
                  >
                    {msg.messageBody}{" "}
                  </Text>
                  <Text style={{ fontStyle: "italic" }}>by {msg.username}</Text>
                </View>
              );
            }
          })}
        </ScrollView>
        <View style={styles.sender}>
          <TextInput
            style={styles.send}
            placeholder="enter your message"
            value={messageBody}
            onChangeText={setMessageBody}
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
    padding: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  username: {
    width: windowWidth,
    alignSelf: "flex-start",
    fontWeight: "bold",
    borderWidth: 1,
    paddingBottom: 1,
    marginBottom: 5,
  },
  roomTitle: {
    color: "Purple",
    fontSize: 25,
  },
  chatMessage: {
    height: Number(parseInt(windowHeight) * 0.75),
    overflow: "visible",
    flexDirection: "column",
    width: windowWidth,
    alignContent: "flex-start",
  },
  message: {
    marginLeft: 0,
    maxWidth: 200,
    paddingLeft: 5,
    border: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  messageRight: {
    marginLeft: "auto",
    marginRight: 0,
    flexDirection: "column",
    maxWidth: 200,
    paddingRight: 5,
    border: 1,
    borderColor: "purple",
  },
  send: {
    width: windowWidth,
    height: 50,
    flex: 4,
    borderColor: "orange",
    backgroundColor: "white",
    paddingLeft: 5,
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
