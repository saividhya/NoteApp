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
  return fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( payload )
})

}

export function logout() {
  const url = `${BASE_URL}/login`;
  return fetch(url, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
})

}


export function getNotes() {
  const url = `${BASE_URL}/notes`;
  return fetch(url, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
})

}

export function getTags() {
  const url = `${BASE_URL}/tags`;
  return fetch(url, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
})

}

export function getNotesForTag(tags) {
  const url = `${BASE_URL}/notes?tags=`+tags;
  return fetch(url, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
})

}
