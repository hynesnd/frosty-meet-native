import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Pressable,
} from "react-native";

export const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState({});

  // const SERVER_URL = "http://localhost:3000";

  // const createFormData = (photo, body = {}) => {
  //   const data = new FormData();

  //   data.append("photo", {
  //     name: photo.fileName,
  //     type: photo.type,
  //     uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  //   });

  //   Object.keys(body).forEach((key) => {
  //     data.append(key, body[key]);
  //   });

  //   return data;
  // };

  const handleChoosePhoto = () => {
    // launchImageLibrary({ noData: true }, (response) => {
    //   // console.log(response);
    //   if (response) {
    //     setPhoto(response);
    //   }
    // });
  };

  const handleUploadPhoto = () => {
    // fetch(`${SERVER_URL}/api/upload`, {
    //   method: "POST",
    //   body: createFormData(photo, { userId: "123" }),
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log("response", response);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        navigation.popToTop();
      };
    }, [])
  );

  return (
    <View>
      <View style={styles.formContainer}>
        <Image style={styles.image} source={require("../logo.png")} />

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
      <View style={styles.buttons}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {photo && (
            <>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 100, height: 100 }}
              />
              <Pressable style={styles.button} onPress={handleUploadPhoto}>
                <Text style={styles.buttonText}>Upload Avatar</Text>
              </Pressable>
            </>
          )}
          <Pressable style={styles.button} onPress={handleChoosePhoto}>
            <Text style={styles.buttonText}>Choose Avatar</Text>
          </Pressable>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {photo && (
            <>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 150, height: 150 }}
              />
              <Pressable style={styles.button} onPress={handleUploadPhoto}>
                <Text style={styles.buttonText}>Upload Profile Picture</Text>
              </Pressable>
            </>
          )}
          <Pressable
            style={styles.button}
            onPress={() => {
              setUser;
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
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

  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
});
