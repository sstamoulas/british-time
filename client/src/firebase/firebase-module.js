export const doLogin = async (userName, database, handleUpdate) => {
  await database.ref('/notifs/' + userName).remove()
  database.ref('/notifs/' + userName).on('value', snapshot => {
    snapshot.exists() && handleUpdate(snapshot.val(), userName)
  })
}

export const doOffer = async (to, offer, database, username) => {
  console.log(to, username)
  await database.ref('/notifs/' + to).set({
    type: 'offer',
    from: username,
    offer: JSON.stringify(offer)
  })
}

export const doAnswer = async (to, answer, database, username) => {
  console.log(to, username)
  await database.ref('/notifs/' + to).update({
    type: 'answer',
    from: username,
    answer: JSON.stringify(answer)
  })
}

export const doLeaveNotif = async (to, database, username) => {
  console.log(to, username)
  await database.ref('/notifs/' + to).update({
    type: 'leave',
    from: username
  })
}

export const doCandidate = async (to, candidate, database, username) => {
  console.log(to, username)
  // send the new candiate to the peer
  await database.ref('/notifs/' + to).update({
    type: 'candidate',
    from: username,
    candidate: JSON.stringify(candidate)
  })
}
