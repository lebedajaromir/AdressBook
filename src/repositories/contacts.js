'use strict'

const firebase = require('firebase-admin')

async function create(user, input) {
  const db = firebase.firestore()

  const docRef = await db.collection(user.email).add({
    email: input.email,
    fname: input.fname,
    lname: input.lname,
    phone: input.phone,
  }).catch(err => { console.log(err.message) })

   return docRef.id
}


module.exports = {
  create,
}
