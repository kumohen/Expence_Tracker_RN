import React,{useEffect,useState} from "react";
import { View,  Text, StyleSheet,FlatList,Image,TouchableOpacity ,ActivityIndicator} from "react-native";
import {connect} from "react-redux";
import { AntDesign } from '@expo/vector-icons';
import { Card,Button ,AirbnbRating ,Rating } from 'react-native-elements'
import {addToCart,getAllProducts,} from "../redux/actions";
import {itemsList} from "../redux/data";

const Home = ({navigation,cart,addToCart,cartItems,getAllProducts,user,}) => {
  const[element,setItems] = useState([]);
  
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View>
              <View style={styles.headerViewStyle}><Text style={{color:"#fff",fontWeight:"bold"}}>{cartItems.length}</Text></View>
            <AntDesign name="shoppingcart" size={30} color="#FFD801" onPress={() => navigation.navigate("Contact")} />
            </View>
           ),
        
        });
      }, [navigation,cartItems]);
      
      useEffect(()=> {
        getAllProducts() ;
      },[])
      useEffect(()=>{
       
        
        setItems(cart);
          
      },[cart,element,user])
   
    //  const getProduct = async ()=> {
    //     await getAllProducts() ;
    //     // setItems(cart);
    //  }
 

  const renderItem = ({item}) => {
    //  console.log("item",item)
   const ratingVal =  Math.floor(Math.random()*6)
     return (
       <>
      <Card >
   
          <View  >
            <TouchableOpacity onPress={() => navigation.navigate("About",{
                 item:item
              })}>
               
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: item.imageUrl }}
              /> 
                </TouchableOpacity>
             <View style={{flexDirection:"row",justifyContent:"space-between"}}>   
            <Text style={{marginTop:4}}>{item.title}</Text>
             <Text style={styles.name}>₹{item.price}</Text> 
             </View>
             { user && 
             <Button
  title=" ADD TO CART"
  onPress={() => addToCart(item.id)}
  icon={
    <AntDesign name="shoppingcart" size={18} color="white" />
  }
  buttonStyle={{ width:127,height:35,backgroundColor:"blue"}}
/>}
             {/* <Button title="Add to Card" onPress={() => addToCart(item.id)} />
              <Button title="Detail" onPress={() => navigation.navigate("About",{
                 item:item
              })} /> */}
            
          </View>
        

    </Card>
    </>
     )
  } 


  return (
    <View style={styles.center}>
       { element.length ? (
          <FlatList
          data={element}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(x,i)=>i}
        />
         ) : <ActivityIndicator size="large" color="#0000ff" style={{marginTop:190}} /> 
       }
     
      
    </View>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart.items,
    cartItems: state.cart.addedItems,
    user:state.auth.isLoginin 
  }
}

export default connect(mapStateToProps,{addToCart,getAllProducts,})(Home);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    // paddingHorizontal:10,
     marginLeft:12
  },
  image:{
    height:120,
    width:130
  },
  name:{
    fontWeight:"bold",
    textAlign:"right",
    fontSize:18
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

