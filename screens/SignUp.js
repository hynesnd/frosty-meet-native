import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, TextInput } from "react-native";

export const SignUp = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        navigation.popToTop();
      };
    })
  );

  return (
    <View>
      <View>
        <Text>signup</Text>
      </View>
      <View>
        <Text>signup</Text>
      </View>
      <View>
        <Text>signup</Text>
      </View>
    </View>
  );
};
