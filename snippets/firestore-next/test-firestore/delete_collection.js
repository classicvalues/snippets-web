// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To make edits to the snippets in this file, please edit the source

// [START modular_delete_collection]
/**
 * Delete a collection, in batches of batchSize. Note that this does
 * not recursively delete subcollections of documents in the collection
 */
import { collection, query, orderBy, limit, getDocs, writeBatch } from "firebase/firestore"; 

function deleteCollection(db, collectionRef, batchSize) {
  const q = query(collectionRef, orderBy('__name__'), limit(batchSize))

  return new Promise(function(resolve) {
      deleteQueryBatch(db, q, batchSize, resolve);
  });
}

async function deleteQueryBatch(db, query, batchSize, resolve) {
  const snapshot = await getDocs(query);

  // When there are no documents left, we are done
  let numDeleted = 0;
  if (snapshot.size > 0) {
    // Delete documents in a batch
    const batch = writeBatch(db);
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    numDeleted = snapshot.size;
  }

  if (numDeleted < batchSize) {
    resolve();
    return;
  }

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  setTimeout(() => {
      deleteQueryBatch(db, query, batchSize, resolve);
  }, 0);
}
// [END modular_delete_collection]