import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { UserContext } from "../contexts/user-context.js";
import { EventContext } from "../contexts/event-context.js";

export default function CommentCard({ navigation, comment }) {
  const { user, setUser } = useContext(UserContext);
  const { event, setEvent } = useContext(EventContext);
  return (
    <View style={styles.chatRoomContainer}>
      <text>Chat Room</text>
    </View>
  );
}

const styles = StyleSheet.create({
  chatRoomContainer: {
    flexDirection: "column",
  },
});
