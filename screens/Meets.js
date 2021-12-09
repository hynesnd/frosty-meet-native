import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Picker,
  Image,
} from "react-native";
import EventCard from "../components/EventCard.js";

export const Meets = ({ navigation }) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [categories, setCategories] = useState([
    { label: "Social", value: "social" },
    { label: "Climbing", value: "climbing" },
    { label: "Cinema", value: "cinema" },
  ]);

  const [events, setEvents] = useState([
    {
      _id: "61b0cf67d802748ef1433440",
      title: "Event1",
      description:
        "This is the description and it is quite a long description as you can see",
      location: {
        longitude: "-8.1927645",
        latitude: "41.124339",
        name: "pin name",
        description: "pin description",
      },
      image: "https://source.unsplash.com/random/50x50",
      categories: [{ category_name: "Social" }],
      tags: [],
      participants: ["neil123"],
      dateCreated: "date",
      start: {
        date: "10/12/2021",
        time: "12:30",
      },
      end: {
        date: "10/12/2021",
        time: "14:45",
      },
      creator: "Balli",
    },
    {
      _id: "61b0cf67d802748ef1433441",
      title: "Event1",
      description:
        "This is the description and it is quite a long description as you can see",
      location: {
        longitude: "-8.1927645",
        latitude: "41.124339",
        name: "pin name",
        description: "pin description",
      },
      image: "https://source.unsplash.com/random/50x50",
      categories: [{ category_name: "Social" }],
      tags: [],
      participants: [],
      dateCreated: "date",
      start: {
        date: "10/12/2021",
        time: "12:30",
      },
      end: {
        date: "10/12/2021",
        time: "14:45",
      },
      creator: "Sam",
    },
    {
      _id: "61b0cf67d802748ef1433442",
      title: "Event1",
      description:
        "This is the description and it is quite a long description as you can see",
      location: {
        longitude: "-8.1927645",
        latitude: "41.124339",
        name: "pin name",
        description: "pin description",
      },
      image: "https://source.unsplash.com/random/50x50",
      categories: [{ category_name: "Social" }],
      tags: [],
      participants: [],
      dateCreated: "date",
      start: {
        date: "10/12/2021",
        time: "12:30",
      },
      end: {
        date: "10/12/2021",
        time: "14:45",
      },
      creator: "Neil",
    },
    {
      _id: "61b0cf67d802748ef1433443",
      title: "Event1",
      description:
        "This is the description and it is quite a long description as you can see",
      location: {
        longitude: "-8.1927645",
        latitude: "41.124339",
        name: "pin name",
        description: "pin description",
      },
      image: "https://source.unsplash.com/random/50x50",
      categories: [{ category_name: "Social" }],
      tags: [],
      participants: [],
      dateCreated: "date",
      start: {
        date: "10/12/2021",
        time: "12:30",
      },
      end: {
        date: "10/12/2021",
        time: "14:45",
      },
      creator: "Yi",
    },
  ]);

  const [followingValue, setFollowingValue] = useState("");
  const [followingOptions, setFollowingOptions] = useState([
    { label: "Anyone", value: "all" },
    { label: "Followed", value: "followed" },
  ]);

  const [joinedValue, setJoinedValue] = useState("");
  const [joinedOptions, setJoinedOptions] = useState([
    { label: "Any Meet", value: "all" },
    { label: "Joined", value: "joined" },
  ]);

  const [mapOpened, setMapOpened] = useState(true);

  const [eventDate, setEventDate] = useState("");
  console.log(eventDate, followingValue, categoryValue);

  return (
    <View>
      <View style={styles.topSelectorRow}>
        <Picker
          style={styles.pickerStyle}
          selectedValue={categoryValue}
          onValueChange={(itemValue, itemIndex) => setCategoryValue(itemValue)}
        >
          {categories.map((cat) => {
            return (
              <Picker.Item
                key={cat.label}
                label={cat.label}
                value={cat.value}
              />
            );
          })}
        </Picker>
        <TextInput
          style={styles.dateInput}
          value={eventDate}
          onChangeText={setEventDate}
          placeholder="DD/MM/YYYY"
        />
        <Picker
          style={styles.pickerStyle}
          selectedValue={followingValue}
          onValueChange={(itemValue, itemIndex) => setFollowingValue(itemValue)}
        >
          {followingOptions.map((opt) => {
            return (
              <Picker.Item
                key={opt.label}
                label={opt.label}
                value={opt.value}
              />
            );
          })}
        </Picker>
        <Picker
          style={styles.pickerStyle}
          selectedValue={joinedValue}
          onValueChange={(itemValue, itemIndex) => setJoinedValue(itemValue)}
        >
          {joinedOptions.map((opt) => {
            return (
              <Picker.Item
                key={opt.label}
                label={opt.label}
                value={opt.value}
              />
            );
          })}
        </Picker>
      </View>
      <View style={styles.secondRowContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (mapOpened) {
              setMapOpened(false);
            } else {
              setMapOpened(true);
            }
          }}
        >
          {mapOpened ? (
            <Text style={styles.buttonText}>Collapse map</Text>
          ) : (
            <Text style={styles.buttonText}>Open map</Text>
          )}
        </Pressable>
        {mapOpened ? (
          <View>
            <View style={styles.mapContainer}>
              <Image
                source={{ uri: "https://source.unsplash.com/random/300x300" }}
                style={styles.map}
              />
            </View>
          </View>
        ) : null}
      </View>
      {events.length === 0 ? (
        <Text>No events here</Text>
      ) : (
        events.map((event) => {
          return <EventCard navigation={navigation} event={event} />;
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topSelectorRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  pickerStyle: {
    height: 25,
    width: 80,
    marginTop: 10,
  },
  dateInput: {
    maxWidth: 100,
    marginTop: 10,
    height: 25,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 4,
  },

  secondRowContainer: {
    marginTop: 25,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "navy",
    marginVertical: 10,
    marginHorizontal: 100,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: 300,
    height: 300,
    marginHorizontal: 50,
  },
});
