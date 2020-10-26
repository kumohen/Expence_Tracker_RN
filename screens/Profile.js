import React,{useEffect, useState} from 'react';
import { View, StyleSheet, Text,FlatList ,Image,TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import { Feather,MaterialIcons,AntDesign } from '@expo/vector-icons';

import moment from 'moment';
import {logOut,fetchPayment,deletePayment,profileDetails} from "../redux/actions/auth"
import * as firebase from "firebase";
import { openImageibary, openCameraReal, PrepareBlob } from "./utils/hepler";
import {clearCart} from "../redux/actions/index";
import {Button} from "react-native-elements"


const Profile = ({user,isLogin,logOut,fetchPayment,paymentListItems,deletePayment,clearCart,}) => {
    const[userInfo,setuserInfo] = useState({});
    const[paymentList,setPaymentList]= useState([]);
    useEffect(()=> {
      // console.log("user"  + user + "  " + "profile");
      // console.log("isLogin" ,isLogin );
      // console.log(user)
      if(user !== undefined){
        fetchPayment(user);
        // profileDetails(user);
        console.log
      }
    },[user,isLogin,])

    useEffect(()=>{
      
        setPaymentList(paymentListItems) 
        firebase.database().ref("shop/auth/" + user).on("value",snapShot => {
         
          if(snapShot && snapShot.val()){
            setuserInfo(snapShot.val())
          }
        })
    },[paymentList,paymentListItems ])
    
    // useEffect(()=>{
    //     // if(user !== undefined){
    //       firebase.database().ref("shop/auth/" + "jdZj8ylM48NcMIm0WcmozXhMk8F2").on("value",snapShot => {
    //         console.log("kdlldl" +  snapShot.val())
    //         if(snapShot && snapShot.val()){
    //           setuserInfo(snapShot.val())
    //         }
    //       })
    //     // }
    //   })
  
    const profileLogout = () => {
        clearCart();
        logOut();
    }
    
    const uploadImageToFirebase = async (image) => {
        const uid = Math.floor(Math.random() * 1000);
        const ref = await firebase.storage().ref("shop/" + uid);
        try {
          const blob = await PrepareBlob(image.uri);
    
          const snapShot = await ref.put(blob);
    
          let downloadUrl = await ref.getDownloadURL();
          await firebase
            .database()
            .ref("shop/auth/" + user)
            .update({ profileImage: downloadUrl });
          console.log("firebase image");
          blob.close();
          return downloadUrl;
        } catch (error) {
          console.log(error);
        }
      };
    
      const pickImage = async () => {
        const result = await openImageibary();
    
        if (result) {
          const downloadUrl = await uploadImageToFirebase(result);
        }
      };
      const pickCameraImage = async () => {
        const result = await openCameraReal();
    
        if (result) {
          const downloadUrl = await uploadImageToFirebase(result);
        }
      };

    const renderItem = ({item})=> {
      
        return (
            <View style={styles.render_list}>
               
                <Text style={{}}>{moment(item.date).format("DD MMM YYYY")}</Text>
                <Text style={{fontWeight:"600", marginLeft:40,  marginRight:60}}>₹{item.price}</Text>
                <View style={{marginLeft:30}}>
                <Feather name="delete" size={20} color="black" onPress={() => deletePayment(user,item.id)}  />
                </View>
            </View>    
        )
    }

    return (
        <View>
            <View style={styles.main_view}>
             <View style={{ marginLeft: 12 }}>
          {userInfo && userInfo.profileImage ? (
            <Image
              source={{ uri: userInfo.profileImage }}
              style={styles.profile_image}
            />
          ) : (
            <Image
              source={{
                uri:
                  "https://res.cloudinary.com/dvfpkko1z/image/upload/v1587451257/download_yfdqq4.png",
              }}
              style={styles.profile_image}
            />
          )}

          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
            {userInfo && userInfo.username}
          </Text>
        </View>
        <View>
          <View
            style={styles.right_view} >
            <TouchableOpacity
              onPress={() => pickCameraImage()}
              style={styles.icon_style}
            >
              <Feather name="camera" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImage()}
              style={styles.icon_style}
            >
              <MaterialIcons name="add-to-photos" size={40} color="black" />
            </TouchableOpacity>
          </View>
          <Button icon={ <AntDesign name="logout" size={19} color="black" />} 
           title="  Logout" buttonStyle={{width:130,marginLeft:60}}  onPress={() => profileLogout()} />
   
        </View>
      
        </View>
          
            <Text style={styles.pay_style_header}>
               Payment List and Date  </Text>
            <View style={styles.payment_header}>
                 <Text>Date</Text>
                 <Text style={{marginLeft:27}}>Payment</Text>
                 <Text style={{marginLeft:34}}>Action</Text>
            </View>    
            <FlatList  data={paymentList} renderItem={renderItem}   keyExtractor={(x,i)=>i.toString()}  />
           
        </View>
    );
};


const mapStateToProps = state => {
 
    return {
        user:state.auth.user ,
        paymentListItems:state.auth.payment,
        isLogin:state.auth.isLoginin,
        getProfileItem:state.auth
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    main_view:{
      flexDirection: "row",
      height: 160,
      paddingTop: 10,
      borderBottomWidth: 2,
      borderColor: "black",
    },
    right_view:{
      marginBottom: 10,
      marginHorizontal: 20,
      flexDirection: "row",
    },
    img_con: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      paddingVertical: 10,
    },
    image: {
      height: 120,
      width: "40%",
      marginHorizontal: 15,
      marginVertical: 15,
    },
    profile_image: {
      height: 120,
      width: 120,
      borderRadius: 60,
      marginBottom: 5,
      marginTop: 2,
    },
    render_list:{
      flexDirection:"row",
      width:"80%",
      alignItems:"flex-start",
      justifyContent:"space-around",
      marginLeft:30
    },
    payment_header:{
      flexDirection:"row",
      width:"90%",
      borderColor:"black",
      borderWidth:1,
      alignItems:"flex-start",
      justifyContent:"space-around",
      marginTop:20,
      marginLeft:20
    },
    icon_style: {
      marginLeft: 20,
      marginRight: 30,
      marginTop: 15,
      height: 60,
      width: 60,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "black",
      alignItems: "center",
      justifyContent: "center",
    },
    pay_style_header:{
      backgroundColor:"gray",width:"90%",color:"white",
            marginLeft:20,marginTop:10,textAlign:"center",height:40,paddingTop:7,fontSize:18
    }
  });

export default connect(mapStateToProps,{logOut,fetchPayment,deletePayment,clearCart,profileDetails})(Profile);