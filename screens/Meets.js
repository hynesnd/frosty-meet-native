import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Picker,
  DatePicker,
  Image,
} from "react-native";
import EventCard from "../components/EventCard.js";
import { getParks, getEvents, getCategories } from "../utils/api.js";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ViewEvent } from "./ViewEvent.js";
import { ViewUser } from "./ViewUser.js";

export const Meets = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [categories, setCategories] = useState([
    { label: "Any type", value: "any type" },
  ]);
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCategories().then(({ data }) => {
      const newCategories = [...categories];
      data.categories.forEach((category) => {
        newCategories.push({
          label:
            category.categorySlug.slice(0, 1).toUpperCase() +
            category.categorySlug.slice(1),
          value: category.categorySlug,
        });
      });
      setCategories(newCategories);
      setCategoryValue("any type");
    });
    getEvents().then(({ data }) => {
      const newEvents = [];
      data.events.forEach((event) => {
        newEvents.push(event);
      });
      setEvents(newEvents);
    });
  }, []);

  const [joinedValue, setJoinedValue] = useState("");
  const [joinedOptions, setJoinedOptions] = useState([
    { label: "Any Meet", value: "all" },
    { label: "Joined", value: "joined" },
  ]);

  const [mapOpened, setMapOpened] = useState(true);

  const [eventDate, setEventDate] = useState("");

  const Stack = createNativeStackNavigator();

  const MeetsPage = () => {
    return (
      <View>
        <View style={styles.topSelectorRow}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={categoryValue}
            onValueChange={(itemValue, itemIndex) =>
              setCategoryValue(itemValue)
            }
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
          {/* <TextInput
            style={styles.dateInput}
            value={eventDate}
            onChangeText={setEventDate}
            placeholder="DD/MM/YYYY"
          /> */}

          {/* <DatePicker
            defaultDate={new Date(2021, 4, 4)}
            minimumDate={new Date(2021, 1, 1)}
            maximumDate={new Date(2021, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            disabled={false}
            onChange={setEventDate}
            value={eventDate}
          />
          <Text>{eventDate.toString().substr(4, 12)}</Text> */}

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
          events.map((currentEvent) => {
            return (
              <EventCard
                key={currentEvent._id}
                navigation={navigation}
                currentEvent={currentEvent}
              />
            );
          })
        )}
      </View>
    );
  };

  return (
    <Stack.Navigator initialRouteName="MeetsPage">
      <Stack.Screen
        name="MeetsPage"
        component={MeetsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewEvent"
        component={ViewEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewUser"
        component={ViewUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  topSelectorRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  pickerStyle: {
    height: 25,
    width: 100,
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
