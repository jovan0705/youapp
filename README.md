## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker
$ npm run start:docker
```

## Test

```bash
# unit tests
$ npm run test
```

# API's
## User
### POST /api/register - Register new Account
```
Payload {
    email: string,
    username: string,
    password: string
}

Return {
    _id: string,
    email: string,
    username: string,
    __v: number,
}
```
### POST /api/login - Login
```
Payload {
    email: string,
    password: string,
}

Return {
    token: string
}
```

### PUT /api/createProfile - Create New Account Profile
```
Headers: {
    token: string
}

Payload {
    name: string,
    gender: string,
    birthday: date,
    horoscope: string,
    zodiac: string,
    height: string,
    weight: string,
}

Return {
    _id: string,
    name: string,
    gender: string,
    birthday: date,
    horoscope: string,
    zodiac: string,
    height: string,
    weight: string,
    __v: number,
}
```
### GET /api/getProfile - Get Account Profile
```
Headers: {
    token: string
}

Return {
    _id: string,
    email: string,
    username: string,
    __v: number,
}
```
### PUT /api/updateProfile - Update Account Profile
```
Headers: {
    token: string
}

Payload {
    name: string,
    gender: string,
    birthday: date,
    horoscope: string,
    zodiac: string,
    height: string,
    weight: string,
}

Return {
    _id: string,
    name: string,
    gender: string,
    birthday: date,
    horoscope: string,
    zodiac: string,
    height: string,
    weight: string,
    __v: number,
}
```
### GET /api/allUsers - Get All User Account
```
Headers: {
    token: string
}

Return {
    _id: string,
    email: string,
    username: string,
    name: string,
    gender: string,
    birthday: date,
    horoscope: string,
    zodiac: string,
    height: string,
    weight: string,
    __v: number,
}[]
```

## Message

### POST /send - send message in chat
```
Headers: {
    token: string
}

Payload: {
    "chatId": string,
    "email": string,
    "name": string,
    "username": string,
    "message": string,
    "participant1": string,
    "participant2": string
}

return "Notification sent to RabbitMQ'"
```
### GET /getMessages - get all messages in database
```
Headers: {
    token: string
}

Payload: {
    "chatId": string,
    "email": string,
    "name": string,
    "username": string,
    "message": string,
    "participant1": string,
    "participant2": string
}

return: "Notification sent to RabbitMQ"
```
### GET /getUserChats - get all chats for the user
```
Headers: {
    token: string
}

return: {
      _id: string,
      chatId: string,
      email: string,
      username: string,
      message: string,
      participant1: string,
      participant2: string,
      date: date,
      name: string,
      __v: number,
    }[]
```
### GET /getChatDetail/:id - get the details for 1 chat
```
Headers: {
    token: string
}

return: {
      email: string,
      username: string,
      message: string,
      participant1: string,
      participant2: string,
      date: date,
      name: string,
    }[]
```