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
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { EventContext } from "../contexts/event-context.js";
import { UserContext } from "../contexts/user-context.js";
import { ViewedUserContext } from "../contexts/viewed-user-context.js";
import { getComments } from "../utils/api.js";
import CommentCard from "../components/CommentCard";
import SlidingPanel from "react-native-sliding-up-down-panels";
import Chat from "../components/Chat";
import { deleteEvent } from "../utils/YizApi.js";
import { getUsers } from "../utils/api.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const ViewEvent = () => {
  const { event, setEvent } = useContext(EventContext);
  const { user, setUser } = useContext(UserContext);
  const { setViewedUser } = useContext(ViewedUserContext);
  const [comments, setComments] = useState([]);
  const [chatOn, setChatOn] = useState(false);
  const [isSelf, setIsSelf] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    getComments(event.eventId).then(({ data }) => {
      setComments(data.comments);
    });
    if (event.creator === user.username) {
      setIsSelf(true);
    } else {
      setIsSelf(false);
    }
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       navigation.goBack();
  //     };
  //   }, [])
  // );

  const handleEditEvent = (id) => {};

  return (
    <View
      style={{
        backgroundColor: "lightgrey",
      }}
    >
      <ScrollView style={styles.contentsContainer}>
        <View style={styles.backContainer}>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              return navigation.navigate("MeetsPage");
            }}
          >
            <Text style={styles.arrow}>⇠</Text>
          </Pressable>
        </View>
        <View style={styles.topContainer}>
          <View style={styles.topRow}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.topRowButtons}>
              {isSelf ? (
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    deleteEvent(event.event_id);
                    navigation.navigate("MeetsPage");
                  }}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              ) : null}
              {isSelf ? (
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    handleEditEvent(event.event_id);
                  }}
                >
                  {isSelf ? <Text style={styles.buttonText}>Edit</Text> : null}
                </Pressable>
              ) : null}
              <Pressable
                style={styles.button}
                onPress={() => {
                  // backend patch: just send event id and body,
                  // which is an updated event object
                  if (event.participants.includes(user.username)) {
                    const newEvent = { ...event };
                    newEvent.participants.splice(
                      newEvent.participants.indexOf(user.username),
                      1
                    );
                    setEvent(newEvent);
                    // backend stuff must be done here
                  } else {
                    const newEvent = { ...event };
                    newEvent.participants.push(user.username);
                    setEvent(newEvent);
                    // backend stuff must be done here
                  }
                  console.log(event.participants);
                }}
              >
                <Text style={styles.buttonText}>
                  {event.participants.includes(user.username)
                    ? "Leave"
                    : "Join"}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.middleRows}>
            <View style={styles.leftMiddleSide}>
              <Text style={styles.eventDetailText}>
                Category:{" "}
                {event.categories.length > 0
                  ? event.categories[0].categorySlug
                  : "none"}
              </Text>
              <Text style={styles.eventDetailText}>
                <Text>Creator: </Text>{" "}
                <Pressable
                  onPress={() => {
                    // ***
                    // Having to filter users as there's no endpoint to get user by username
                    // ***
                    getUsers()
                      .then((res) => {
                        const correctUser = res.data.users.filter((person) => {
                          return person.username === event.creator;
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
                  <Text style={styles.eventCreatorButton}>{event.creator}</Text>
                </Pressable>
              </Text>
              <Text style={styles.eventDetailText}>
                Date: {event.eventStart.slice(0, 10).replaceAll("-", "/")}
              </Text>
              <Text style={styles.eventDetailText}>
                Time: {event.eventStart.slice(11, 16)} -{" "}
                {event.eventEnd.slice(11, 16)}
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
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
        <View style={styles.participantsContainer}>
          <Text style={{ color: "white", paddingTop: 5, fontWeight: "bold" }}>
            Participants:{" "}
          </Text>
          <View style={{ flexDirection: "row", padding: 5 }}>
            {event.participants.map((participant) => {
              return (
                <Pressable
                  key={participant}
                  onPress={() => {
                    // ***
                    // Having to filter users as there's no endpoint to get user by username
                    // ***
                    getUsers()
                      .then((res) => {
                        const correctUser = res.data.users.filter((person) => {
                          return person.username === participant;
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
                  style={styles.participant}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ textDecorationLine: "none" }}> </Text>
                    <Text style={styles.participantButtonText}>
                      {participant}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Pressable style={styles.galleryContainer}>
          <View style={styles.galleryItem}>
            <Image
              source={{ uri: "https://source.unsplash.com/random/200x200" }}
              style={styles.galleryImage}
            />
          </View>
          <View style={styles.galleryItem}>
            <Image
              source={{ uri: "https://source.unsplash.com/random/200x200" }}
              style={styles.galleryImage}
            />
          </View>
          <View style={styles.galleryItem}>
            <Image
              source={{ uri: "https://source.unsplash.com/random/200x200" }}
              style={styles.galleryImage}
            />
          </View>
        </Pressable>
        <View style={styles.commentsContainer}>
          <View style={styles.commentTopRow}>
            <Text style={{ fontWeight: "bold", color: "white", padding: 5 }}>
              Comments
            </Text>
            {user.username ? (
              <Pressable
                style={styles.button}
                onPress={() => {
                  // *** need to make postComment at backend
                  // postComment(event.event_id);
                  // isPosting... state
                }}
              >
                <Text style={styles.buttonText}>Post Comment</Text>
              </Pressable>
            ) : null}
          </View>
          {comments.map((comment) => {
            return <CommentCard key={comment._id} comment={comment} />;
          })}
        </View>
      </ScrollView>
      <View style={styles.ChatContainer}>
        <SlidingPanel
          onAnimationStop={() => setChatOn(true)}
          panelPosition="bottom"
          headerLayoutHeight={100}
          headerLayout={() => (
            <View style={styles.headerLayoutStyle}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                ⇡
              </Text>
              <Text style={styles.commonTextStyle}>Live Chat!</Text>
            </View>
          )}
          slidingPanelLayout={() => (
            <View style={styles.slidingPanelLayoutStyle}>
              {chatOn ? <Chat /> : null}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wholePage: {
    width: windowWidth,
    height: Number(parseInt(windowHeight)),
  },
  contentsContainer: {
    flexDirection: "column",
    marginHorizontal: 30,
    marginBottom: 55,
    height: 700,
  },
  topContainer: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#8E806A",
    borderRadius: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#4A403A",
  },
  eventTitle: {
    fontSize: 20,
    color: "white",
  },
  button: {
    borderRadius: 10,
    backgroundColor: "lightgrey",
    fontSize: 16,
    padding: 5,
    height: 24,
    marginHorizontal: 5,
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
    borderRadius: 10,
  },
  eventDetailText: {
    fontSize: 16,
    color: "white",
  },
  eventDescription: {
    fontSize: 12,
    marginVertical: 5,
    borderRadius: 10,
    color: "white",
    padding: 10,
    backgroundColor: "#8E806A",
  },
  participantsContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: 10,

    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#8E806A",
  },
  galleryContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 10,

    height: 100,
    marginVertical: 5,
    backgroundColor: "#8E806A",
  },
  galleryImage: {
    width: 80,
    height: 80,
    marginTop: 10,
    borderRadius: 10,
  },
  commentsContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: 10,

    padding: 5,
    marginVertical: 5,
    marginBottom: 50,
    backgroundColor: "#8E806A",
  },
  headerLayoutStyle: {
    width: windowWidth,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#8E806A",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  slidingPanelLayoutStyle: {
    width: windowWidth,
    height: Number(parseInt(windowHeight) - 100),
    backgroundColor: "lightgrey",
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
  arrow: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4A403A",
    marginTop: 10,
  },

  participantButtonText: {
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "blue",
  },
  participantSpacer: {
    textDecorationLine: "none",
  },
  participant: {
    flex: 1,
  },
  eventCreatorButton: {
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "blue",
  },
  topRowButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 5,
  },
  commentTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
