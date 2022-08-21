## OTP-Service Backend
- In this application user can signup and signin and user able to forget his password does not matter user is login or not only user should present in databse.

### Features
- User Registration and Login himself.
- Password forget API if User want to change his password.
- OTP sent on his email when forgetting password.
- OTP match API then only access to change password otherwise he can not access.
- Password change API where update or insert new password
- Proper error message in the case User passing wrong details and request.
- Proper validation if User Post empty request.

### Prerequisite
- Understanding of Node.js
- Understanding of Async Await
- Mongo DB locally installed and running

## 🛠 Tech
- **Client   :** Post-man,
- **Server   :** Node, Express, JWT, node-mailer, JWT, bcryptjs
- **Database :** mongoDB
- This app. requires Node.js v14+ to run.

### Install the dependencies and devDependencies and start the server.
Before starting the server please ensure mongodb server is locally installed and running on the default port

```bash
  cd otp_service
```
```bash
  npm install
```

## REST endpoints
### Customer 
- Signup 
``` 
localhost:8080/authentication/v1/users/signup
Sample request body :
{
    "username":"tiger",
    "phone" :"1232321",
    "email" : "ajay7yadav95@gmail.com",
    "password" : "welcome"
}
Sample response body :
{
    "username":"tiger",
    "phone" :"1232321",
    "email" : "ajay7yadav95@gmail.com"
}
```
- Signin 
```
localhost:8080/authentication/v1/users/signin
Sample request body :
{
    "email" : "ajay7yadav95@gmail.com",
    "password" : "welcome"
}
Sample response body :
{
    "message": "Welcome tiger",
    "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJhbTEiLCJpYXQiOjE2NTk2MDE2NTEsImV4cCI6MTY1OTYwMTg1MX0.CXhGnfBTmYE-0vG11Wzyf-oqDGodmW0IwR9cQh7gO84"
}
```
### Forget Password
- pass email in query params 
- forget?email=ajay7yadav95@gmail.com
``` 
request

localhost:8080/authentication/v1/users/forget?email=ajay7yadav95@gmail.com

Sample response body :
{
    "message": " OTP sent in your email"
}
```

```
- Put OTP and get access to change password
Sample request body :
localhost:8080/authentication/v1/users/fillotp
{
    "otp" : 90911
}

Sample response body :
{
    "message": " OTP Matched ",
    "nextStep": "Go -> /authentication/v1/users/newpass "
}

```
- Now You have access to change password
```
Sample request body :
localhost:8080/authentication/v1/users/newpass
{
    "email" : "ajay7yadav95@gmail.com",
    "password" : "newpassword"
}
Sample response body :
{
    "message": " Password has been changed "
}
```

## Development
Want to improve? Great! Make the changes and raise a PR. Reach out to me over ajay7yadav95@gmail.com
