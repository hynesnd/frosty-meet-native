import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { UserContext } from "../contexts/user-context.js";
import { EventContext } from "../contexts/event-context.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Header({ navigation, currentEvent }) {
  const [toggleOn, setToggleOn] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { event, setEvent } = useContext(EventContext);
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={styles.mainContainer}
        onPress={() => {
          if (toggleOn) {
            setToggleOn(false);
          } else {
            setToggleOn(true);
          }
        }}
      >
        <Image
          source={{ uri: "https://source.unsplash.com/random/200x200" }}
          style={styles.eventImage}
        />
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text style={styles.eventTitle}>
              {currentEvent.title.length > 25
                ? `${currentEvent.title.slice(0, 20)}...`
                : currentEvent.title}
            </Text>
            <Text style={styles.eventDateTime}>
              {currentEvent.eventStart.slice(0, 10).replaceAll("-", "/")}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text>Creator: "CREATOR"</Text>
            <Text style={styles.eventDateTime}>
              {currentEvent.eventStart.slice(11, 16)} -{" "}
              {currentEvent.eventEnd.slice(11, 16)}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text>
              Info:{" "}
              {currentEvent.description.length > 100
                ? `${currentEvent.description.slice(0, 60)}...`
                : currentEvent.description}
            </Text>
          </View>
        </View>
      </Pressable>
      {toggleOn ? (
        <View style={styles.extraContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              // backend patch: just send event id and body,
              // which is a new participants array
              if (currentEvent.participants.includes(user.username)) {
                const newEvent = { ...currentEvent };
                newEvent.participants.splice(
                  newEvent.participants.indexOf(user.username),
                  1
                );
                setCurrentEvent(newEvent);
                // backend stuff must be done here
              } else {
                const newEvent = { ...currentEvent };
                newEvent.participants.push(user.username);
                setCurrentEvent(newEvent);
                // backend stuff must be done here
              }
              console.log(currentEvent.participants);
            }}
          >
            <Text style={styles.buttonText}>
              {currentEvent.participants.includes(user.username)
                ? "Leave"
                : "Join"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setEvent(currentEvent);
              return navigation.navigate("View Event");
            }}
          >
            <Text style={styles.buttonText}>Read More</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 4,
    borderColor: "lightgrey",
    borderWidth: 1,
    margin: 10,
    height: 100,
  },
  eventImage: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "column",
    flex: 3,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  extraContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
