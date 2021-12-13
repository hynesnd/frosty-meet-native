import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { SignUp } from "./SignUp";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Stack = createNativeStackNavigator();

export const Login = ({ navigation }) => {
  const LoginForm = () => {
    const [formData, setFormdata] = useState({
      username: "",
      password: "",
    });

    const handleInputs = (text, keyToChange) => {
      setFormdata((prev) => {
        const newState = { ...prev, [keyToChange]: text };
        return newState;
      });
    };
    return (
      <View style={styles.pageContainer}>
        <ImageBackground
          source={"https://media4.giphy.com/media/BDucPOizdZ5AI/giphy.gif"}
          resizeMode="cover"
          style={styles.background}
        >
          <View style={styles.wholePage}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require("../logo.png")} />
            </View>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(text) => handleInputs(text, "username")}
                placeholder="Username:"
              />

              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => handleInputs(text, "password")}
                placeholder="Password:"
                secureTextEntry={true}
              />

              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>

              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.buttonText}>Sign up</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <Stack.Navigator initialRouteName="LoginForm">
      <Stack.Screen
        name="LoginForm"
        component={LoginForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  wholePage: {
    width: windowWidth,
    height: Number(parseInt(windowHeight) - 50),
  },
  logo: {
    height: 300,
    width: 300,
    borderRadius: 150,
    alignSelf: "center",
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderColor: "red",
    padding: 3,
    fontSize: 18,
    borderRadius: 4,
    backgroundColor: "white",
  },

  formContainer: {
    flex: 1,
    alignItems: "center",
  },

  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
});
