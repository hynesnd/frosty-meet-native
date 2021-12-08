import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Header({ navigation, event }) {
  // need to create user context
  const [toggleOn, setToggleOn] = useState(false);

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
              // need user context to check if joined
              // need to check context provider for native
            }}
          >
            <Text style={styles.buttonText}>Join/Leave</Text>
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
