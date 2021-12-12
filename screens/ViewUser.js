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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ViewedUserContext } from "../contexts/viewed-user-context.js";

export const ViewUser = () => {
  const { viewedUser } = useContext(ViewedUserContext);
  const navigation = useNavigation();

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       return () => {
  //         navigation.goBack();
  //       };
  //     }, [])
  //   );

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
      <Pressable
        style={styles.backButton}
        onPress={() => {
          return navigation.navigate("ViewEvent");
        }}
      >
        <Text style={styles.arrow}>⇠</Text>
      </Pressable>
      <View style={styles.pageContainer}>
        <View style={styles.firstRowContainer}>
          <Text style={styles.username}>{viewedUser.username}</Text>
        </View>
        <View style={styles.middlePartContainer}>
          <View style={styles.pictureContainer}>
            <Image source={require("../logo.png")} style={styles.avatar} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.displayName}>{viewedUser.displayName}</Text>
            <Text style={styles.pronouns}>{viewedUser.pronouns}</Text>
            <Text style={styles.dateOfBirth}>{viewedUser.dateOfBirth}</Text>
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
  arrow: {
    fontSize: 30,
    fontWeight: "bold",
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
