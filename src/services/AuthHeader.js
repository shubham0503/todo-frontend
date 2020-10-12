export default async function authHeader() {
  let user = await JSON.parse(localStorage.getItem('loggedInUser'));

  if (user && user.accessToken) {
    return {
      'headers': {
        'x-access-token': user.accessToken
      }
    };
  } else {
    return {};
  }
}