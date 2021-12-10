import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { UserContext } from "../contexts/user-context.js";

// import { ViewedUserContext } from "../contexts/viewed-user-context.js";

export const UserPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [editClicked, setEditClicked] = useState(false);

  // const { viewedUser, setViewedUser } = useContext(ViewedUserContext);
  // const
  // useEffect(() => {
  //   if (!viewedUser.username) {
  //     setViewedUser(user);
  //     setItself(true);
  //   } else {
  //     setItself(false);
  //   }
  // }, []);

  return (
    <View>
      <View style={styles.pageContainer}>
        <View style={styles.firstRowContainer}>
          <Text style={styles.username}>{user.username}</Text>
          {editClicked ? (
            <Pressable
              onPress={() => {
                setEditClicked(false);
              }}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>cancel</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setEditClicked(true);
              }}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>edit</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.middlePartContainer}>
          <View style={styles.pictureContainer}>
            <Image source={require("../logo.png")} style={styles.avatar} />
            <Pressable style={styles.uploadImage} onPress={() => {}}>
              <Text style={styles.uploadImageText}>Upload Photo</Text>
            </Pressable>
          </View>
          <View style={styles.detailsContainer}>
            {editClicked ? (
              <TextInput
                placeholder="Display name..."
                style={styles.textInputDetails}
              />
            ) : (
              <Text style={styles.displayName}>{user.displayName}</Text>
            )}
            {editClicked ? (
              <TextInput
                placeholder="Pronouns..."
                style={styles.textInputDetails}
              />
            ) : (
              <Text style={styles.pronouns}>{user.pronouns}</Text>
            )}
            <Text style={styles.dateOfBirth}>{user.dateOfBirth}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    padding: 25,
    margin: 5,
  },
  username: {
    flex: 4,
    fontSize: 25,
  },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  editButtonText: {
    fontSize: 18,
  },
  firstRowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 25,
  },
  middlePartContainer: {
    flexDirection: "row",
  },
  pictureContainer: {
    flex: 1,
  },
  detailsContainer: {
    marginTop: 20,
    marginLeft: 20,
    flex: 1,
    flexDirection: "column",
  },
  avatar: {
    height: 150,
    width: 150,
  },
  displayName: {
    height: 40,
    fontSize: 30,
  },
  pronouns: {
    height: 40,
    fontSize: 20,
  },
  dateOfBirth: {
    height: 40,
    fontSize: 20,
  },
  textInputDetails: {
    height: 35,
    fontSize: 16,
    marginTop: 5,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
