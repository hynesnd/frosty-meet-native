import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { UserContext } from "../contexts/user-context.js";
import { EventContext } from "../contexts/event-context.js";
import { getUsers } from "../utils/api";
import { ViewedUserContext } from "../contexts/viewed-user-context.js";
import { useNavigation } from "@react-navigation/native";

export default function CommentCard({ comment }) {
  const { user, setUser } = useContext(UserContext);
  const { event, setEvent } = useContext(EventContext);
  const { setViewedUser } = useContext(ViewedUserContext);
  const [addedVote, setAddedVote] = useState(0);
  const navigation = useNavigation();

  return (
    <View style={styles.commentContainer} key={comment._id}>
      <View style={styles.topRow}>
        <Pressable
          onPress={() => {
            // ***
            // Having to filter users as there's no endpoint to get user by username
            // ***
            getUsers()
              .then((res) => {
                const correctUser = res.data.users.filter((person) => {
                  return person.username === comment.username;
                })[0];
                setViewedUser(correctUser);
              })
              .then(() => {
                return navigation.navigate("ViewUser");
              });
            // ***
            // ***
            // ***
          }}
        >
          {" "}
          <View style={{ flexDirection: "row" }}>
            <Text>By: </Text>
            <Text style={styles.username}>{comment.username}</Text>
          </View>
        </Pressable>
        <Text style={styles.createdAt}>
          Posted: {comment.dateCreated.slice(0, 10)}
        </Text>
      </View>
      <View style={styles.middleRow}>
        <Text style={styles.body}>{comment.commentBody}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Pressable
          style={styles.votesButton}
          onPress={() => {
            setAddedVote((current) => {
              return current + 1;
            });
          }}
        >
          <Text>👍 {comment.votes + addedVote}</Text>
          {/* // need backend patch request to send added vote */}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commentContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
  },
  username: {
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "blue",
  },

  votesButton: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderRadius: 5,
  },
});
