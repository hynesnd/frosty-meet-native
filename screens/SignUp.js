import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, TextInput } from "react-native";

export const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        navigation.popToTop();
      };
    })
  );

  return (
    <View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username:"
        />

        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Display Name:"
        />

        <TextInput
          style={styles.input}
          value={pronouns}
          onChangeText={setPronouns}
          placeholder="Pronouns:"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email:"
        />

        <TextInput
          style={styles.input}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="Date of birth:"
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
});
