import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";

export const Home = ({ navigation }) => {
  return (
    <View>
      <View>
        <View style={styles.mapContainer}>
          <Image source={require("../logo.png")} style={styles.map} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Find Event")}
        >
          <Text style={styles.buttonText}>Find Event</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Create Event")}
        >
          <Text style={styles.buttonText}>Create Event</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "navy",
    margin: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
  },

  map: {
    width: 300,
    height: 300,
    margin: 50,
  },
});
