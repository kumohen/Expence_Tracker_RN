import * as firebase from "firebase";
import { connect } from "react-redux";

export const userRegistration = (username,email,password)=> async (dispatch) => {
 
   const respon = await firebase.auth().createUserWithEmailAndPassword(email, password) ;
   const response = await  firebase.database().ref("shop/auth/" + respon.user.uid).set({ username, email, password});
    const user = {
        username:username,
        id:respon.user.uid,
    } ;
    console.log(user);
    dispatch({
        type:"USER_SIGNUP",
        payload: user
    })
}


export const userLogin = (email,password)=> async (dispatch) => {
 
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);

     dispatch({
         type:"USER_SIGNIN",
         payload: response.user.uid
     })
 }

export const logOut = () => async (dispatch)=> {
     await firebase.auth().signOut() ;
     dispatch({
         type:"LOGOUT",
         payload:null
     })
}

export const checkIsLogin = () => {
    firebase.auth().onAuthStateChanged(function (user) {
         if(user){
             return true 
         }else {
             return false ;
         }
      });
     
}


export const paymentSubmit = (userId ,price)=> async (dispatch)=> {
   await firebase.database().ref("shop/payment/" + userId).push().set({
       date:Date.now() ,
       price:price
   })
   dispatch({
       type:"PAYMENT_PAY"
   })
}

export const fetchPayment = (userId )=> async (dispatch)=> {
    await firebase.database().ref("shop/payment/" + userId).on("value", snapshot => {
        // let data = Object.values(snapshot.val());
        if(snapshot && snapshot.val()){
            let items = [];
        const getValue = snapshot.val() ;
        let obj ;
        for(let item in getValue){
             obj = {
                 id:item ,
                 date:getValue[item].date,
                 price:getValue[item].price
             }
             items.push(obj)
        }
        
        dispatch({
            type:"PAYMENT_DETAIL",
            payload:items
        })
        } else{
            dispatch({
                type:"PAYMENT_DETAIL",
                payload:[]
            })
        }
      
    })
 }
 
 export const deletePayment = (userId,postId) => async (dispatch)=>{
     await firebase.database().ref("shop/payment/" + userId).child(postId).remove(()=> {
         console.log(` your post ${postId} deleted  `)
     })
     dispatch({
         type:"PAYMENT_DELETED"
     })
 }

 
 export const profileDetails = (userId )=> async (dispatch)=> {
    await firebase.database().ref("shop/auth/" + userId).on("value", snapshot => {
        // let data = Object.values(snapshot.val());
     

        if(snapshot && snapshot.val()){
            let data = snapshot.val() ;
            let arrData = [];
            arrData.push(data);
          
            dispatch({
                type:"PROFILE_DETAIL",
                payload:arrData
            })
        }
     })
 }