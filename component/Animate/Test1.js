import React, { useState ,useRef} from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Button,
  FlatList,
  Image,
  PanResponder
} from "react-native";
import {Data} from "../../hooks/Home";  
const uri =
  "https://res.cloudinary.com/dvfpkko1z/image/upload/v1600186899/injyytgpdjckefce7cfk.jpg";

export default function Test1() {
  const mesure = useState(new Animated.Value(0.5))[0];
  const [index,setIndex] = useState(null) 
 



 const backImageto = ()=> {
  Animated.timing(mesure, {
    toValue:0,
    duration: 1000,
  }).start();
 }

  const handleChange = (id) => {
      setIndex(id);
    Animated.timing(mesure, {
      toValue:1,
      duration: 1000,
    }).start();
  };
   

  const handleChange2 = () => {
    Animated.timing(mesure, {
      toValue:0,
      duration: 1000,
    }).start();
  };
   

  const scale = mesure.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6,1.2],
   })

   const renderItem = ({item,index})=> {
    return(
      <>
         <TouchableWithoutFeedback  onPress={() => setIndex(item.id)} > 
         {
           index === item.id ? (
    
     
            <Animated.Image
            source={{ uri: uri }}
            style={[styles.imageStyle,{
               transform:[ {scale} ]
            }]}
           
          />
            
           ): (
         
            <Image source={{uri:item.uri}}  style={style.imageStyle}  />
         
       
           )
         }
      
         </TouchableWithoutFeedback>
      </>  
    )
  }

  return (
    <View style={styles.container}>
      {/* <TouchableWithoutFeedback  onPress={handleChange}>
      
        <Animated.Image
          source={{ uri: uri }}
          style={[styles.imageStyle,{
             transform:[ {scale} ]
          }]}
         
        />

      </TouchableWithoutFeedback>
      <Button title="back" onPress={handleChange2} /> */}
            <FlatList  data={Data}   renderItem={renderItem}
        keyExtractor={item => item.id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boxView:{
    height:200,
    width:300,
    backgroundColor:"blue"
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "#5AD2F4",
  },
  imageStyle: {
    height: 200,
    width: 200,
  },
});
