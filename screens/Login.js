import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
} from "react-native";
import { SignUp } from "./SignUp";
import { loginUser } from "../utils/nh-api";
import { UserContext } from "../contexts/user-context";

const Stack = createNativeStackNavigator();

export const Login = ({ navigation }) => {
  const LoginForm = () => {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormdata] = useState({
      username: "",
      password: "",
    });

    const [error, setError] = useState(null);

    const handleInputs = (text, keyToChange) => {
      setFormdata((prev) => {
        const newState = { ...prev, [keyToChange]: text };
        return newState;
      });
    };

    // handle login
    const handleLogin = async () => {
      try {
        const res = await loginUser(formData);
        const resUser = res.data.response.user;
        const resToken = res.data.response.token;

        setUser({
          ...resUser,
          token: resToken,
        });
        navigation.navigate("Home");
      } catch (err) {
        setError(err.response.data.message);
        // clear form
        setFormdata({
          username: "",
          password: "",
        });
      }
    };
    return (
      <View style={styles.pageContainer}>
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
          {error && <Text style={styles.error}>{error}</Text>}
          <Pressable style={styles.button} onPress={handleLogin}>
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
  logo: {
    height: 300,
    width: 300,
    textAlign: "center",
  },
  logoContainer: {
    flex: 1,
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
  error: {
    color: "red",
  },
});
