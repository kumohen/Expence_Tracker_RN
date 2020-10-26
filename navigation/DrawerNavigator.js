import React,{useEffect, useState} from "react";
import * as firebase from "firebase"
import { createDrawerNavigator } from "@react-navigation/drawer";
import {checkIsLogin}  from "../redux/actions/auth"
import { ContactStackNavigator ,AuthStackNavigator,ProfileStackNavigator,PaymentStackNavigator} from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import { FontAwesome,FontAwesome5,MaterialCommunityIcons ,Entypo} from '@expo/vector-icons';



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const[isLogin,setIslogin] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user !== null && user.uid) {
        setIslogin(true);
      } else {
        setIslogin(false);
      }
    });
  }, []); 
  
  return (
    <Drawer.Navigator>
      
          <>
          
             <Drawer.Screen name="Home" component={TabNavigator}
              options={{
                title: 'Home',
                drawerIcon: ({ focused, size }) => (
                  <>
              
                  <FontAwesome name="home" size={18} color="black" />
                  </>
                  ) }}
             />
            <Drawer.Screen name="Contact" component={ContactStackNavigator} 
             options={{
              title: 'Cart',
              drawerIcon: ({ focused, size }) => (
                <MaterialCommunityIcons name="cart-outline" size={18} color="black" />
                ) }}
            />
          
        
  { !isLogin &&  <Drawer.Screen name="Signup" component={AuthStackNavigator} 
        options={{
          title: 'Signup',
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5 name="sign-in-alt" size={18} color="black" />
            ) }}
  />  }
  {  isLogin && <Drawer.Screen name="Profile" component={ProfileStackNavigator} 
          options={{
            title: 'Profile',
            drawerIcon: ({ focused, size }) => (
              <Entypo name="user" size={18} color="black" />
              ) }}
  /> } 
    {  isLogin && <Drawer.Screen name="Payment" component={PaymentStackNavigator} 
      
  /> } 
  
          </>

          
      
    
    
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;