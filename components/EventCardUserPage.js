import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { UserContext } from "../contexts/user-context.js";

import { useNavigation } from "@react-navigation/native";

export default function EventCardUserPage({ currentEvent }) {
  // const Stack = createNativeStackNavigator();
  //   const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.mainContainer}>
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
            <Text>Creator: {currentEvent.creator}</Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 4,
    borderColor: "lightgrey",
    borderWidth: 1,
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
    margin: 5,
  },
  joinButton: {
    marginLeft: 65,
    marginRight: 85,
  },
  buttonText: {
    width: 80,
    justifyContent: "center",
  },
  creatorButtonText: {
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "blue",
  },
});
