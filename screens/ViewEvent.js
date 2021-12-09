import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { EventContext } from "../contexts/event-context.js";
import { UserContext } from "../contexts/user-context.js";
import { getComments } from "../utils/api.js";
import CommentCard from "../components/CommentCard";
import SlidingPanel from "react-native-sliding-up-down-panels";
import Chat from "../components/Chat";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const ViewEvent = ({ navigation }) => {
  const { event, setEvent } = useContext(EventContext);
  const { user, setUser } = useContext(UserContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(event.eventId).then(({ data }) => {
      setComments(data.comments);
    });
  }, []);

  return (
    <View>
      <ScrollView style={styles.contentsContainer}>
        <View style={styles.topContainer}>
          <View style={styles.topRow}>
            <Text style={styles.eventTitle}>{event.title}</Text>
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
                Category:{" "}
                {event.categories.length > 0 ? event.categories[0].categorySlug : "none"}
              </Text>
              <Text style={styles.eventDetailText}>
                Creator: {event.creator.username}
              </Text>
              <Text style={styles.eventDetailText}>
                Date: {event.eventStart.slice(0, 10).replaceAll("-", "/")}
              </Text>
              <Text style={styles.eventDetailText}>
                Time: {event.eventStart.slice(11, 16)} - {event.eventEnd.slice(11, 16)}
              </Text>
            </View>
            <View style={styles.rightMiddleSide}>
              <Image
                source={{ uri: "https://source.unsplash.com/random/200x200" }}
                style={styles.eventImage}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.eventDescription}>Description: {event.description}</Text>
        </View>
        <Pressable style={styles.participantsContainer}>
          <Text>Participants</Text>
        </Pressable>
        <Pressable style={styles.galleryContainer}>
          <Image
            source={{ uri: "https://source.unsplash.com/random/200x200" }}
            style={styles.galleryImage}
          />
          <Image
            source={{ uri: "https://source.unsplash.com/random/200x200" }}
            style={styles.galleryImage}
          />
          <Image
            source={{ uri: "https://source.unsplash.com/random/200x200" }}
            style={styles.galleryImage}
          />
        </Pressable>
        <View style={styles.commentsContainer}>
          <Text>Comments</Text>
          {comments.map((comment) => {
            return <CommentCard key={comment._id} comment={comment} />;
          })}
        </View>
      </ScrollView>
      <View style={styles.ChatContainer}>
        <SlidingPanel
          headerLayoutHeight={100}
          headerLayout={() => (
            <View style={styles.headerLayoutStyle}>
              <Text style={styles.upArrow}>⇡</Text>
              <Text style={styles.commonTextStyle}>Live Chat!</Text>
            </View>
          )}
          slidingPanelLayout={() => (
            <View style={styles.slidingPanelLayoutStyle}>
              <Chat />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentsContainer: {
    flexDirection: "column",
    margin: 30,
    height: 700,
  },
  topContainer: {
    flexDirection: "column",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    padding: 3,
    height: 24,
  },
  middleRows: {
    marginVertical: 10,
    flexDirection: "row",
  },
  leftMiddleSide: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-around",
  },
  rightMiddleSide: {
    flex: 1,
  },
  eventImage: {
    width: 150,
    height: 150,
  },
  eventDetailText: {
    fontSize: 16,
  },
  eventDescription: {
    fontSize: 12,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  participantsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 5,
    borderWidth: 1,
    height: 25,
    padding: 5,
    marginVertical: 5,
  },
  galleryContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 5,
    borderWidth: 1,
    height: 100,
    marginVertical: 5,
  },
  galleryImage: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
  commentsContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
  },
  headerLayoutStyle: {
    width: windowWidth,
    height: 100,
    backgroundColor: "grey",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  slidingPanelLayoutStyle: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  commonTextStyle: {
    color: "white",
    fontSize: 18,
  },
  ChatContainer: {
    flex: 1,
  },
  upArrow: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
