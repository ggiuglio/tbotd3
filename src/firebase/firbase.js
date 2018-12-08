import * as firebase from "firebase";

import { FirebaseConfig } from "./firebaseConfig";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const stages = databaseRef.child('stages');
export const games = databaseRef.child("games");
export const pcs = databaseRef.child("pcs");