const BASE_URL = 'http://localhost:5000';


export function register(email,password,tags) {
  const url = `${BASE_URL}/users`;
  var payload = {
    "username":email,
    "email":email,
    "password":password,
    "interests":tags
  }
  return fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( payload )
})

}


export function login(email,password) {
  const url = `${BASE_URL}/login`;
  var payload = {
    "email":email,
    "password":password
  }
  console.log(payload)
  return fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( payload )
})

}
