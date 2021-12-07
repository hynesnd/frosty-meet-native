import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, Pressable } from "react-native";

export const Home = () => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Home</Text>
      </View>

      <View>
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: "https://source.unsplash.com/random/300x300" }}
            style={styles.map}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Meets")}>
          <Text style={styles.buttonText}>Join a Meet!</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("ScheduleMeets")}
        >
          <Text style={styles.buttonText}>Create a Meet!</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginBottom: 20,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  titleContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    justifyContent: "center",
  },

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
