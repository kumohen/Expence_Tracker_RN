import React from "react";
import { View, StyleSheet, Text,Image } from "react-native";
import { Card,   } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import {connect} from "react-redux";
import {addToCart} from "../redux/actions";
import {Button} from "react-native-elements";

const About = ({route, navigation,cartItems,addToCart}) => {
  const {item}  = route.params ;
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <View style={styles.headerViewStyle}><Text style={{color:"#fff",fontWeight:"bold"}}>{cartItems.length}</Text></View>
        <AntDesign name="shoppingcart" size={30} color="yellow" onPress={() => navigation.navigate("Contact")} />
        </View>
       ),
    });
  }, [navigation,cartItems]);
  return (
    <View style={styles.center}>
      
      <Card>
   
   <View >
       <Image
         style={styles.image}
         resizeMode="cover"
         source={{ uri: item.imageUrl }}
       /> 
      <Text style={styles.price}> ₹{item.price}</Text> 
      <Text style={styles.name}>{item.desc}</Text> 
       {/* <Button title="Add To Card" onPress={() => addToCart(item.id)} /> */}
       <Button
  title=" ADD TO CART"
  onPress={() => addToCart(item.id)}
  icon={
    <AntDesign name="shoppingcart" size={18} color="yellow" />
  }
  buttonStyle={styles.btn_style}
/>
   </View>
 

</Card>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,

  },
  image:{
    height:320,
    width:"100%"
  },
  price:{
    fontSize:20,
    textAlign:"right",
   
  },
  btn_style:{
    width:"100%",height:35,backgroundColor:"red",marginTop:15
  },
  headerViewStyle:{
    position:"absolute",
    height:18,
    width:18,
    borderRadius:9,
    backgroundColor:"red",
    borderWidth:1,
    marginLeft:-4,
    marginTop:16,
    zIndex:999,
    alignItems:"center",
    justifyContent:"center"
  }
});
const mapStateToProps = state => {
  return {
   
    cartItems: state.cart.addedItems,
    user:state.auth.isLoginin 
  }
}
export default connect(mapStateToProps,{addToCart})(About);