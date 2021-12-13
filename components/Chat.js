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
        <View style={styles.usernameContainer}>
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
                  <View style={styles.messageInnerLeft}>
                    <Text
                      style={{
                        backgroundColor: "orange",
                        fontSize: 20,
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      {msg.messageBody}
                    </Text>
                  </View>
                  <View style={styles.messageInnerLeft}>
                    <Text style={{ fontStyle: "italic" }}>by {msg.username}</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View key={msg._id} style={styles.messageRight}>
                  <View style={styles.messageInnerRight}>
                    <Text
                      style={{
                        backgroundColor: "purple",
                        fontSize: 20,
                        borderRadius: 10,
                        padding: 10,
                        color: "white",
                      }}
                    >
                      {msg.messageBody}{" "}
                    </Text>
                  </View>
                  <View style={styles.messageInnerRight}>
                    <Text style={{ fontStyle: "italic" }}>by {msg.username}</Text>
                  </View>
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
    height: Number(parseInt(windowHeight) - 100),
  },
  chat: {
    width: windowWidth,
    height: Number(parseInt(windowHeight) - 110),
    padding: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  usernameContainer: {
    width: windowWidth,
    alignSelf: "flex-start",
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "grey",
    paddingBottom: 3,
    marginBottom: 5,
  },
  roomTitle: {
    fontSize: 25,
  },
  chatMessage: {
    height: Number(parseInt(windowHeight) * 0.75),
    overflow: "visible",
    flexDirection: "column",
    width: windowWidth,
  },
  message: {
    marginLeft: 0,
    maxWidth: 250,
    paddingLeft: 5,
    border: 1,
    borderRadius: 5,
    flexDirection: "column",
    marginVertical: 5,
  },
  messageInnerLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  messageRight: {
    marginLeft: "auto",
    marginRight: 0,
    flexDirection: "column",
    maxWidth: 250,
    paddingRight: 5,
    border: 1,
    marginVertical: 5,
  },
  messageInnerRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  send: {
    width: windowWidth,
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
    height: 50,
  },
});
