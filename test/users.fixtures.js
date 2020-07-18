function makeUsersArray() {
  return [
    {
      id: 1,
      fullname: 'Sam Gamgee',
      username: 'sam.gamgee@shire.com',
      password: 'secret',
    },
    {
      id: 2,
      fullname: 'Peregrin Took',
      username: 'peregrin.took@shire.com',
      password: 'secret',
    }
  ]
}

module.exports = {
  makeUsersArray
}