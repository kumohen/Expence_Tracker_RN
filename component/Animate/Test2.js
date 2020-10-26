import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Text,Image,Dimensions,FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Data} from "../../hooks/Home";

const uri =
  "https://res.cloudinary.com/dvfpkko1z/image/upload/v1600186899/injyytgpdjckefce7cfk.jpg";
  const SCREEN_WIDTH = Dimensions.get("window").width;


const Test2 = () => {
  const[indexId ,setIndexId] = useState(null);
  const pan = useRef(new Animated.ValueXY()).current;


  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event,gesture) => {
        // pan.setOffset({
        //   x: pan.x._value,
        //   y: pan.y._value
        // });
        console.log("granted")
       if(gesture){
          callFuction();
       }
       
      },
      onPanResponderMove:(event,gesture)=>{
      
          // pan.setValue({
          //   x:gesture.dx,y:gesture.dy
          // })
      },
      // onPanResponderMove: Animated.event(
      //   [
      //     null,
      //     { dx: pan.x, dy: pan.y }
      //   ]
      // ),
      onPanResponderRelease: () => {
  
        handleReaslase()
      }
    })
  ).current;   

  useEffect(()=> {
        
  },[indexId])

  
 const handleReaslase = ()=>{
   console.log("relase")
    // pan.flattenOffset();
     realseCard();
 }
  
 const callFuction = () => {
   console.log("granted");
   pan.setValue({
     x:10,y:0
   })
  
 } 
  const realseCard = ()=>  {
    console.log("touched out")
   Animated.timing(pan ,{
     toValue:{x:0,y:0},
     duration:400
   }).start()
  
}


const getCardStyle = ()=> {

  const rotate = pan.x.interpolate({
    inputRange: [0,  10],
    outputRange: [1,3.5],
  });
  return {
    ...pan.getLayout(),
    transform: [{ scaleY:rotate }],
  };
 
}

  const renderItem = ({item,index})=> {
    return(
      <>
         <TouchableOpacity  onPress={() => setIndexId(item.id)} > 
         {
           indexId === item.id ? (
         
           <Animated.View  style={[ getCardStyle(),styles.viewStyle]}
          
           {...panResponder.panHandlers}>
            <Image
            source={{ uri: item.uri }}
            style={{height:"100%",width:"100%"}} 
          />
          </Animated.View>
           ): (
         
            <Image source={{uri:item.uri}} style={{height:100,width:100}}  />
         
       
           )
         }
      
         </TouchableOpacity>
      </>  
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      {/* <Animated.View
        style={[{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }, getCardStyle()  ]}
        {...panResponder.panHandlers}
      >
        {/* <View style={styles.box} /> */}
        {/* <Image source={{uri:uri}} style={{height:100,width:100}}  />
      </Animated.View> */} 
      <View style={{top:60}}>
         <FlatList  data={Data}   renderItem={renderItem}
        keyExtractor={item => item.id} />
      </View>  
    </View>
  );
}


export default Test2 ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  viewStyle:{
    height:200,
    width:200,
    borderColor:"red",
    borderWidth:1
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  },
  imageStyle: {
    height: 200,
    width: 200,
  },
});
