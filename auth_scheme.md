1. \> User sends auth request(credentials) to provider
2. \< Provider sends auth response(accessToken) to user
3. \> User sends auth request(accessToken) to Apollo
4. \> Apollo sends verification request(accessToken) to provider
5. \< Provider sends verification response(isValid) to Apollo
6. \> Apollo sends auth response(authToken) to user