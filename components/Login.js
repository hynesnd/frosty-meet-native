import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(password);

  return (
    <View>
      <View>
        <Text style={styles.title}>Welcome to FrostyMeet</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username:"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password:"
          secureTextEntry={true}
        />
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
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderColor: "red",
    fontSize: 20,
  },
});
