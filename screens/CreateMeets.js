import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Picker,
  Pressable,
  Image,
} from "react-native";

export const CreateMeets = ({ navigation }) => {
  const [meetTitle, setMeetTitle] = useState("");
  const [meetDescription, setMeetDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");

  const [categories, setCategories] = useState([
    { label: "Social", value: "social" },
    { label: "Climbing", value: "climbing" },
    { label: "Cinema", value: "cinema" },
  ]);

  // const [chosenDate, setChosenDate] = useState(new Date());

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [event, setEvent] = useState({});

  const uploadEventImage = () => {};

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       navigation.popToTop();
  //     };
  //   }, [])
  // );

  return (
    <View>
      <View style={styles.titleContainer}></View>
      <View style={styles.formContainer}>
        <View style={styles.formRow1}>
          <TextInput
            style={styles.input}
            value={meetTitle}
            onChangeText={setMeetTitle}
            placeholder="Title:"
          />
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
        </View>
        <View style={styles.formRow2}>
          <TextInput
            style={styles.inputDescription}
            value={meetDescription}
            onChangeText={setMeetDescription}
            placeholder="Please give a description ..."
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={styles.formRow3}>
          <Text style={styles.row3Labels}>Start:</Text>
          <Text style={styles.row3Labels}>End:</Text>
        </View>
        <View style={styles.formRow4}>
          <View style={styles.eventStartContainer}>
            <TextInput
              style={styles.dateInput}
              value={startDate}
              onChangeText={setStartDate}
              placeholder="DD/MM/YYYY"
            />
            <TextInput
              style={styles.timeInput}
              value={startTime}
              onChangeText={setStartTime}
              placeholder="HH:MM"
            />
          </View>
          <View style={styles.eventEndContainer}>
            <TextInput
              style={styles.dateInput}
              value={endDate}
              onChangeText={setEndDate}
              placeholder="DD/MM/YYYY"
            />
            <TextInput
              style={styles.timeInput}
              value={endTime}
              onChangeText={setEndTime}
              placeholder="HH:MM"
            />
          </View>
        </View>
      </View>
      <View>
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: "https://source.unsplash.com/random/300x300" }}
            style={styles.map}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            uploadEventImage;
          }}
        >
          <Text style={styles.buttonText}>Upload Image</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            setEvent;
            navigation.navigate("View Event");
          }}
        >
          <Text style={styles.buttonText}>Submit!</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginBottom: 20,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  titleContainer: {
    padding: 12,
    justifyContent: "center",
  },

  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },

  input: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
    maxWidth: 150,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 1,
    fontSize: 18,
    borderRadius: 4,
  },

  inputDescription: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 1,
    fontSize: 18,
    borderRadius: 4,
    alignSelf: "stretch",
  },

  formContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-evenly",
    marginLeft: 5,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "navy",
    margin: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
  },

  formRow1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  formRow2: {
    flexDirection: "row",
    justifyContent: "center",
  },

  pickerStyle: {
    height: 25,
    width: 150,
    marginTop: 10,
  },

  formRow3: {
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  row3Labels: {
    textAlign: "left",
    flex: 1,
    paddingLeft: 8,
  },

  formRow4: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },
  eventStartContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
  eventEndContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
  dateInput: {
    maxWidth: 90,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 4,
  },
  timeInput: {
    maxWidth: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 4,
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: 300,
    height: 300,
    margin: 50,
  },
});
