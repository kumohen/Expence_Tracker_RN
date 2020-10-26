

// import React, { PureComponent } from 'react'
// import { View, Text, StyleSheet } from 'react-native'
// import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
// import Button from './component/Button'
// import axios from "axios";

const { func } = require("prop-types")

// Stripe.setOptionsAsync({
//   publishableKey: 'pk_test_zKpriPTZuuvkW0Lmv32D4kIW00Hpmdac2h',
//   androidPayMode: 'test'
// });

// export default class CardFormScreen extends PureComponent {
//   static title = 'Card Form'

//   state = {
//     loading: false,
//     token: null,
//   }

//   handleCardPayPress = async () => {
//     try {
//       this.setState({ loading: true, token: null })
//       const token = await Stripe.paymentRequestWithCardFormAsync({
//         // Only iOS support this options
//         smsAutofillDisabled: true,
//         requiredBillingAddressFields: 'full',
//         prefilledInformation: {
//           billingAddress: {
//             name: 'Gunilla Haugeh',
//             line1: 'Canary Place',
//             line2: '3',
//             city: 'Macon',
//             state: 'Georgia',
//             country: 'US',
//             postalCode: '31217',
//             email: 'ghaugeh0@printfriendly.com',
//           },
//         },
//       })

//       this.setState({ loading: false, token })
//     } catch (error) {
//       this.setState({ loading: false })
//     }
//   }

//   makePayment =  async ()=> {
//     console.log("okk")
//      this.setState({loading:true});
//      axios({
//        method:"POST",
//        url:'https://us-central1-fir-rn-5de34.cloudfunctions.net/completePaymentWithStripe',
//        data:{
//         amount:150,
//          currency:'usd',
//          token:this.state.token
//        }
//      }).then(response => {
//        console.log(response)
//        this.setState({loading:false})
//        return "mohendkk"
//      })
//   }
//   render() {
//     const { loading, token } = this.state

//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>
//           Card Form Example
//         </Text>
//         <Text style={styles.instruction}>
//           Click button to show Card Form dialog.
//         </Text>
//         <Button
//           text="Enter you card and pay"
//           loading={loading}
//           onPress={this.handleCardPayPress}
          
//         />
//         <View
//           style={styles.token}
//          >
//           {token &&
//           <>
//             <Text style={styles.instruction}>
//               Token: {token.tokenId}
//             </Text>
//             <Button  text="make payment" loading={loading} onPress={this.makePayment} />
//             </>
//           }
//         </View>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instruction: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   token: {
//     height: 20,
//   },
// })

const arr1 = [
  {id:1,name:"mohen"},
  {id:2,name:"raj"}
]
let items = [];

function printFun(userName){
    items.push(userName)
}

function callFire(allElement){
   for(let item of allElement){
    printFun(item.name)
   }
}

callFire(arr1);

console.log(items)
