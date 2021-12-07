import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export const CreateMeets = () => {
  const [meetTitle, setMeetTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
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
          <DropDownPicker
            style={styles.pickerStyle}
            open={open}
            value={categoryValue}
            items={categories}
            setOpen={setOpen}
            setValue={setCategoryValue}
            setItems={setCategories}
            placeholder="Select a category"
            placeholderStyle={{
              color: "grey",
              fontWeight: "bold",
            }}
            showArrowIcon={true}
          />
        </View>
      </View>
      {/* <View>
        <Text>create meets</Text>
      </View>
      <View>
        <Text>create meets</Text>
      </View> */}
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
    justifyContent: "flex-start",
  },

  pickerStyle: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    maxWidth: 150,
    fontSize: 20,
    padding: 3,
  },
});
