import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Button,Text} from "react-native"
import Home from "../screens/Home";
import About from "../screens/About";
import Contact from "../screens/Contact";
import Signup from "../screens/Signup";
import Signin from "../screens/Signin"
import Profile from "../screens/Profile"
import Payment from "../screens/Payment";
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#1a5ecc",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home}    options={({ navigation, route }) => ({
          headerTitle: props =>  <Ionicons name="ios-menu" size={40} color="white"  onPress={() => navigation.openDrawer()} />,
        })} />
      <Stack.Screen name="About" component={About}   options={({ navigation, route }) => ({
          headerTitle: null,
        })} />
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contact" component={Contact}   options={({ navigation, route }) => ({
          headerTitle: props =>  <Ionicons name="ios-menu" size={40} color="white"  onPress={() => navigation.openDrawer()} />,
        })} />
    </Stack.Navigator>
  );
}
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile}   options={({ navigation, route }) => ({
          headerTitle: props =>  <Ionicons name="ios-menu" size={40} color="white"  onPress={() => navigation.openDrawer()} />,
        })} />
    </Stack.Navigator>
  );
}
const PaymentStackNavigator = ()=> {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Payment" component={Payment} options={{title:null}}   options={({ navigation, route }) => ({
          headerTitle: props =>  <Ionicons name="ios-menu" size={40} color="white"  onPress={() => navigation.openDrawer()} />,
        })} />
    </Stack.Navigator>
  );
}
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
         <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
   
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator,AuthStackNavigator,ProfileStackNavigator,PaymentStackNavigator };