import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { UserContext } from "../contexts/user-context.js";

export default function Header({ navigation, event }) {
  const [toggleOn, setToggleOn] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [currentEvent, setCurrentEvent] = useState(event);

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
        <Image source={{ uri: event.image }} style={styles.eventImage} />
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDateTime}>
              Starts: {event.start.date} {event.start.time}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text>Creator: {event.creator}</Text>
            <Text style={styles.eventDateTime}>
              Ends: {event.end.date} {event.end.time}
            </Text>
          </View>
          <View style={styles.textRow}>
            <Text>Info: {event.description}</Text>
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
              {event.participants.includes(user.username) ? "Leave" : "Join"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
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
