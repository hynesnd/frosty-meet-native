import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";
import DrawerItems from "./constants/DrawerItems";
import Header from "./components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { CreateMeets } from "./screens/CreateMeets";
import { Meets } from "./screens/Meets";
import { UserPage } from "./screens/UserPage";
import { UserProvider } from "./contexts/user-context.js";
import { EventProvider } from "./contexts/event-context.js";

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserProvider>
      <EventProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerType="front"
            initialRouteName="Login"
            drawerContentOptions={{
              activeTintColor: "#e91e63",
              itemStyle: { marginVertical: 10 },
            }}
          >
            {DrawerItems.map((drawer) => (
              <Drawer.Screen
                key={drawer.name}
                name={drawer.name}
                component={
                  drawer.name === "Login"
                    ? Login
                    : drawer.name === "Create Meets"
                    ? CreateMeets
                    : drawer.name === "Meets"
                    ? Meets
                    : drawer.name === "User Page"
                    ? UserPage
                    : Home
                }
                options={{
                  drawerIcon: ({ focused }) =>
                    drawer.iconType === "Material" ? (
                      <MaterialCommunityIcons
                        name={drawer.iconName}
                        size={24}
                        color={focused ? "#e91e63" : "black"}
                      />
                    ) : drawer.iconType === "Feather" ? (
                      <Feather
                        name={drawer.iconName}
                        size={24}
                        color={focused ? "#e91e63" : "black"}
                      />
                    ) : (
                      <FontAwesome5
                        name={drawer.iconName}
                        size={24}
                        color={focused ? "#e91e63" : "black"}
                      />
                    ),
                  headerShown: true,
                }}
              />
            ))}
          </Drawer.Navigator>
        </NavigationContainer>
      </EventProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
