'use strict'

const firebase = require('firebase-admin')

async function create(user, input) {
  const db = firebase.firestore()

  const docRef = await db.collection(user.email).add({
    email: input.email,
    fname: input.fname,
    lname: input.lname,
    phone: input.phone,
  })
  return docRef.id
  // .then(docRef => {
  // console.log(docRef.id)
  // })
  // .catch(error => {
  // console.error('Error adding document: ', error)
  // })
}


module.exports = {
  create,
}
