import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Text,Image,Dimensions,FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Data} from "../../hooks/Home";

const uri =
  "https://res.cloudinary.com/dvfpkko1z/image/upload/v1600186899/injyytgpdjckefce7cfk.jpg";
  const SCREEN_WIDTH = Dimensions.get("window").width;


const Test2 = () => {
  const pan = useState(new Animated.ValueXY())[0];
  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: (event,gesture)=> {
           pan.setValue({
             x:gesture.dx,
             y:gesture.dx
           })
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  )[0];
  
  const angle = pan.x.interpolate({
    inputRange: [0,  10 ,20,30,40,50,60],
    outputRange: [0,-5,-10,-15,-10,-5,0],
  });

  const stylesObj = {
    transform: [{ translateX: pan.x },{translateY:angle}]
  }
 
 

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
    <Animated.View  {...panResponder.panHandlers} style={[stylesObj ,styles.viewStyle]} >
     <TouchableOpacity >
    
      <Image     source={{uri:uri}} style={[styles.imageStyle ]}  />
      
  
     </TouchableOpacity>     
       
    
      </Animated.View>  
    </View>
  );
}


export default Test2 ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  viewStyle:{
    flex:1,
     top:100

  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  },
  imageStyle: {
    height:100,
    width:100,
    borderRadius:50,
    borderColor:"red",
    borderWidth:2,
 
  },
});
