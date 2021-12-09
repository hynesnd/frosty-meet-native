import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { UserContext } from "../contexts/user-context.js";
import { EventContext } from "../contexts/event-context.js";

export default function CommentCard({ navigation, comment }) {
  const { user, setUser } = useContext(UserContext);
  const { event, setEvent } = useContext(EventContext);
  return (
    <View style={styles.commentContainer}>
      <View style={styles.topRow}>
        <Text style={styles.username}>By: {comment.username}</Text>
        <Text style={styles.createdAt}>
          Posted: {comment.dateCreated.slice(0, 10)}
        </Text>
      </View>
      <View style={styles.middleRow}>
        <Text style={styles.body}>{comment.commentBody}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Pressable style={styles.votesButton} onPress={() => {}}>
          👍{comment.votes}
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
    fontWeight: "bold",
  },
  bottomRow: {
    flex: "row",
  },
  votesButton: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderRadius: 5,
  },
});
