import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const Home = ({ navigation }) => {
  return (
    <View style={styles.wholePage}>
      <ImageBackground
        source={"https://media4.giphy.com/media/BDucPOizdZ5AI/giphy.gif"}
        resizeMode="cover"
        style={styles.background}
      >
        <View>
          <View style={styles.logoContainer}>
            <Image source={require("../logo.png")} style={styles.logo} />
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wholePage: {
    width: windowWidth,
    height: Number(parseInt(windowHeight)),
  },
  background: {
    flex: 1,
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
  logoContainer: {
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

  logo: {
    width: 300,
    height: 300,
    margin: 50,
    borderRadius: 150,
  },
});
