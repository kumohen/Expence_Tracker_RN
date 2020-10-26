import React,{useEffect,useState} from "react";
import { View, StyleSheet, Text,FlatList ,Image, } from "react-native";
import {connect} from "react-redux"
import {removeFromCart,addQuantity} from "../redux/actions"
import { AntDesign ,Feather} from '@expo/vector-icons';
import { Card, Button  } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";

const Contact = ({cartItems,removeFromCart,total,addQuantity,navigation}) => {
  const[element,setItems] = useState([]);
  const[show,setShow] = useState(false)
  useEffect(()=> {
    setItems(cartItems)
  },[element,cartItems])


  const renderItem = ({item}) => {

    return (
   

  
         <View style={{flexDirection:"row",height:50,borderColor:"black",borderWidth:1,alignItems:"flex-start",justifyContent:"space-around"}}>
            {/* <Text style={styles.title}>{item.title}</Text>  */}
             <Image
               style={styles.image}
               resizeMode="cover"
               source={{ uri: item.imageUrl }}
             /> 
              
           
          
          
              <AntDesign name="caretdown" size={24} color="black" style={styles.quantity} onPress={() => removeFromCart(item.id)} />
           
              <Text style={styles.quantity}>{item.quantity}</Text> 
              <AntDesign name="caretup" size={24} color="black" style={styles.quantity} onPress={() => addQuantity(item.id)} />
           
              <Text style={styles.price}>₹{item.price}</Text> 
            
         </View>
       

  
    )
 } 
 const renderGridItem = ({item})=> {
   return(
    <Card>
   
    <View >
        <Image
          style={styles.imageGrid}
          resizeMode="cover"
          source={{ uri: item.imageUrl }}
        /> 
       <Text style={{textAlign:"center",fontWeight:"bold"}}>Price: ₹{item.price}</Text> 
      <View style={{flexDirection:"row"}}>
      <AntDesign name="caretdown" size={24} color="black" style={styles.quantity} onPress={() => removeFromCart(item.id)} />
         <Text>Quanity:{item.quantity}</Text>
         <AntDesign name="caretup" size={24} color="black" style={styles.quantity} onPress={() => addQuantity(item.id)} />
      </View>  
      
    </View>
  
  
  </Card>
   )
 }
  const renderListItems = ()=> (
    <View style={{marginTop:200}}>
       <Text style={styles.pay_style_header}>Your Cart Is Empty</Text>
    </View>  
  )
  return (
    <View style={styles.center}>
      {
          !element.length < 1 ? (
            <View style={{flexDirection:"row" ,alignItems:"center", justifyContent:"space-around",marginBottom:15,height:30,backgroundColor:"green",marginTop:5}}>
             <Button icon={  <Feather name="grid" size={24} color="white" />}
  title="Grid view " onPress={() => setShow(true)} buttonStyle={{width:"100%"}}
/>
<Button icon={  <AntDesign name="table" size={24} color="white"  />} buttonStyle={{width:"100%"}}
  title=" Table view" onPress={() => setShow(false)} 
/>
   
          
            
            </View>
          ): null
      }
    
      {
        !show ? 
        <>
        {!element.length < 1 ? 
        <View style={{flexDirection:"row",height:30,borderColor:"black",borderWidth:1,alignItems:"flex-start",justifyContent:"space-around"}}>
           
        <Text style={styles.items}>Image</Text>
        <Text  style={styles.items}>Re_Quan</Text>
        <Text  style={styles.items}>Quantity</Text>
        <Text  style={styles.items}>Add_Quan</Text>
        <Text  style={styles.items}>Price</Text>
        </View> : null }
  <FlatList
    data={element}
    renderItem={renderItem}

    keyExtractor={item => item.id.toString()}
    ListEmptyComponent = {renderListItems()}
  />
  </> : 
   <FlatList
   data={element}
   renderItem={renderGridItem}
   numColumns={2}
   keyExtractor={item => item.id.toString()}
 
 />
      }
    
      
      <View style={{flexDirection:"row",justifyContent:"space-between",margin:5}}>
       <View style={{height:40,backgroundColor:"#483C32" ,width:150,alignItems:"center",justifyContent:"center"}}>
         <Text style={{textAlign:"center",color:"white",fontSize:20}}>Total:{total}</Text>
       </View> 
      
       <Button title="Go For Payment"  onPress={() => navigation.navigate("Payment")} />
       </View>

    </View>
  );
};


const mapStateToProps = state => {
  return {
    cartItems: state.cart.addedItems ,
    total:state.cart.total
  }
}
export default connect(mapStateToProps,{removeFromCart,addQuantity})(Contact);

const styles = StyleSheet.create({
  center: {
    flex: 1,
 
  },
  title:{
  flex:1,
  alignSelf:"center",

  },
  image:{
    flex:1,
    height:50,
    width:50
  },
  imageGrid:{
    height:120,
    width:120
  },
  quantity:{
    flex:1,
    alignSelf:"center",
    textAlign:"center" 
  },
  price:{
   flex:1,
   alignSelf:"center",
   textAlign:"center" 
  },
  items:{
    fontWeight:"bold"
  },
  pay_style_header:{
    backgroundColor:"gray",width:"90%",color:"white",
          marginLeft:20,marginTop:10,textAlign:"center",height:40,paddingTop:7,fontSize:18
  }
});

