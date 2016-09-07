import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';

import routes from './routes';
import render from '@sketchpixy/rubix/lib/node/router';

// Firebase
Firebase.initializeApp({
  apiKey: "AIzaSyCKrocAcCrVXRNIGVLEcdLyO_jEF-RkBe0",
  authDomain: "project-3313342985754506611.firebaseapp.com",
  databaseURL: "https://project-3313342985754506611.firebaseio.com",
  storageBucket: "project-3313342985754506611.appspot.com",
});


render(routes, () =>{
  console.log('Completed rendering!');
});

if(module.hot){
  module.hot.accept('./routes', () =>{
    // reload routes again
    require('./routes').default;
    render(routes);
  });
}
