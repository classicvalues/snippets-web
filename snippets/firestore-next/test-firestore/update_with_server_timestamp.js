// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START update_with_server_timestamp_modular]
import { collection, updateDoc, serverTimestamp } from "firebase/firestore";

const docRef = doc(collection(db, 'objects'), 'some-id');

// Update the timestamp field with the value from the server
const updateTimestamp = await updateDoc(docRef, {
    timestamp: serverTimestamp()
});
// [END update_with_server_timestamp_modular]