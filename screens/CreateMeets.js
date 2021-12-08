import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Picker } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export const CreateMeets = () => {
  const [meetTitle, setMeetTitle] = useState("");
  const [meetDescription, setMeetDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [categories, setCategories] = useState([
    { label: "Social", value: "social" },
    { label: "Climbing", value: "climbing" },
    { label: "Cinema", value: "cinema" },
  ]);

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>create meets</Text>
      </View>
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
            onValueChange={(itemValue, itemIndex) => setCategoryValue(itemValue)}
          >
            {categories.map((cat) => {
              return <Picker.Item key={cat.label} label={cat.label} value={cat.value} />;
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
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
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
    borderColor: "red",
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
    borderColor: "red",
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
});
