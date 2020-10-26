const functions = require('firebase-functions');


const stripe = require('stripe')('sk_test_QV3Rpkc2E26D82xL2gYFnJhO00xkvOMvro');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.completePaymentWithStripe = functions.https.onRequest(

    (request, response) => {
 
        stripe.charges
 
        .create({
 
            amount: request.body.amount,
 
            currency: request.body.currency,
 
            source: "master_card",
 
        })
 
        .then(charge => {
 
           return  response.send(charge);
 
        })
 
        .catch(error => {
 
            console.log(error);
 
        });
 
    },
 
 );


//  https://us-central1-fir-rn-5de34.cloudfunctions.net/completePaymentWithStripe

// Project Console: https://console.firebase.google.com/project/fir-rn-5de34/overview