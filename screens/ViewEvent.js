import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { EventContext } from "../contexts/event-context.js";
import { UserContext } from "../contexts/user-context.js";

export const ViewEvent = () => {
  const { event, setEvent } = useContext(EventContext);
  const { user, setUser } = useContext(UserContext);

  return (
    <View>
      <View style={styles.contentsContainer}>
        <View style={styles.topContainer}>
          <View style={styles.topRow}>
            <Text>{event.title}</Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                // backend patch: just send event id and body,
                // which is an updated event object
                if (currentEvent.participants.includes(user.username)) {
                  const newEvent = { ...currentEvent };
                  newEvent.participants.splice(
                    newEvent.participants.indexOf(user.username),
                    1
                  );
                  setCurrentEvent(newEvent);
                  // backend stuff must be done here
                } else {
                  const newEvent = { ...currentEvent };
                  newEvent.participants.push(user.username);
                  setCurrentEvent(newEvent);
                  // backend stuff must be done here
                }
                console.log(currentEvent.participants);
              }}
            >
              <Text style={styles.buttonText}>
                {event.participants.includes(user.username) ? "Leave" : "Join"}
              </Text>
            </Pressable>
          </View>
          <View style={styles.middleRows}>
            <View style={styles.leftMiddleSide}>
              <Text style={styles.eventDetailText}>
                Category: {event.categories[0].category_name}
              </Text>
              <Text style={styles.eventDetailText}>
                Creator: {event.creator.username}
              </Text>
              <Text style={styles.eventDetailText}>
                Description: {event.description}
              </Text>
              <Text style={styles.eventDetailText}>Start: {event.start}</Text>
              <Text style={styles.eventDetailText}>End: {event.end}</Text>
            </View>
            <View style={styles.rightMiddleSide}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentsContainer: {
    flexDirection: "column",
  },
  topContainer: {
    flexDirection: "column",
  },
  topRow: {
    flexDirection: "row",
  },
  middleRows: {
    flexDirection: "row",
  },
  leftMiddleSide: {
    flexDirection: "column",
  },
  eventDetailText: {
    width: 200,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
});
