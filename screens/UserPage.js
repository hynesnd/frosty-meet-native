import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { UserContext } from "../contexts/user-context.js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getEvents } from "../utils/api.js";
import EventCardUserPage from "../components/EventCardUserPage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const UserPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [editClicked, setEditClicked] = useState(false);

  const [hostedEvents, setHostedEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [hostedClicked, setHostedClicked] = useState(false);
  const [attendedClicked, setAttendedClicked] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getEvents().then(({ data }) => {
      setHostedEvents(
        data.events.filter((event) => event.creator === user.username)
      );
      setAttendedEvents(
        data.events.filter((event) =>
          event.participants.includes(user.username)
        )
      );
    });
  }, []);

  return (
    <View>
      <ImageBackground
        source={"https://i.makeagif.com/media/8-27-2015/1NpjsX.gif"}
        resizeMode="cover"
        style={styles.wholePage}
      >
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
          <View style={styles.eventListBox}>
            <Text>Hosted:</Text>
            {hostedEvents.length > 0 ? (
              !hostedClicked ? (
                <Pressable
                  onPress={() => {
                    setHostedClicked(true);
                  }}
                >
                  <Text>View {hostedEvents.length} events</Text>
                </Pressable>
              ) : (
                <>
                  <Pressable
                    onPress={() => {
                      setHostedClicked(false);
                    }}
                  >
                    <Text>Hide {hostedEvents.length} events</Text>
                  </Pressable>
                  <ScrollView style={styles.eventListScroller}>
                    {hostedEvents.map((event) => {
                      return <EventCardUserPage currentEvent={event} />;
                    })}
                  </ScrollView>
                </>
              )
            ) : (
              <Text>No hosted events</Text>
            )}
          </View>
          <View style={styles.eventListBox}>
            <Text>Attended:</Text>
            {attendedEvents.length > 0 ? (
              !attendedClicked ? (
                <Pressable
                  onPress={() => {
                    setAttendedClicked(true);
                  }}
                >
                  <Text>View {attendedEvents.length} events</Text>
                </Pressable>
              ) : (
                <>
                  <Pressable
                    onPress={() => {
                      setAttendedClicked(false);
                    }}
                  >
                    <Text>Hide {attendedEvents.length} events</Text>
                  </Pressable>
                  <ScrollView style={styles.eventListScroller}>
                    {attendedEvents.map((event) => {
                      return <EventCardUserPage currentEvent={event} />;
                    })}
                  </ScrollView>
                </>
              )
            ) : (
              <Text>No hosted events</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wholePage: {
    width: windowWidth,
    height: Number(parseInt(windowHeight) - 50),
  },
  pageContainer: {
    padding: 15,
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
    backgroundColor: "white",

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

  eventListBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  eventListScroller: {
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 200,
  },
});
