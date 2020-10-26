

import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import CartButton from '../component/Button'
import axios from "axios";
import {connect} from "react-redux"
import {clearCart,buyProducts} from "../redux/actions/index";
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import {paymentSubmit,} from "../redux/actions/auth";

 class CardFormScreen extends PureComponent {
  static title = 'Card Form'

  state = {
    loading: false,
    token: null,
  }
   
  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      const token = await Stripe.paymentRequestWithCardFormAsync({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      })

      this.setState({ loading: false, token });
      if(this.props.user !== undefined){
        this.props.paymentSubmit(this.props.user,this.props.total);
        this.props.buyProducts(this.props.cartItems ,this.props.user)
        this.props.clearCart() ;
      }
   
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  makePayment =  async ()=> {
   
     this.setState({loading:true});
     axios({
       method:"POST",
       url:'https://us-central1-fir-rn-5de34.cloudfunctions.net/completePaymentWithStripe',
       data:{
        amount:this.props.total,
         currency:'usd',
         token:this.state.token
       }
     }).then(response => {
       console.log(response)
       this.setState({loading:false})
       return "mohendkk"
     })
  }
  render() {
    const { loading, token } = this.state
    const {total ,user ,cartItems} = this.props ;
 
    return (
      <View style={styles.container}>
        {!token ?
        <Text style={styles.header}>
        Pay : {total} ₹
        </Text> : null }
        {!token ? 
        <CartButton
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
          
        /> : null }
         
        <View
          style={styles.token}
         >
          {token &&
          <>
           <Card containerStyle={{height:200,marginTop:-160,alignItems:"center",justifyContent:"center",}}>
       
            <View style={{marginLeft:70}}>
            <AntDesign name="checkcircleo" size={74} color="green" />
            </View>
            <Text style={styles.instruction}>
               You sucessfully payment 
            </Text>
            </Card>
       
            </>
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
    return {
      user:state.auth.user,
      total:state.cart.total,
      cartItems: state.cart.addedItems
    }
  }
  

export default   connect(mapStateToProps,{clearCart,paymentSubmit,buyProducts}) (CardFormScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 5,
    fontSize:20
  },
  token: {
    height: 20,
  },
})