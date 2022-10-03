# **User Authetication**

### Development

Please use Node.js version >= 14.8

Run with Docker to start Redis

`docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest`

Set `.env`

`REDIS_URL=redis://localhost:6379`

Install

`npm install`

Start development

`npm start`

Open [http://localhost:3000](http://localhost:3000) to interact with API

### Service Requirements
Using Node.js as your framework and Redis for data storage, we need an authentication API for internal services to create and authenticate users. This API should be RESTful and use JSON. It should be fast and secure, and be able to pass a basic security audit (e.g. password complexity). If there are areas of security that your solution hasn't had time to address they should be annotated for future development. The API should be able to create a new login with a username and password, ensuring that usernames are unique. It should also be able to authenticate this login at a separate end point. It should respond with 200 OK messages for correct requests, and 401 for failing authentication requests. It should do proper error checking, with error responses in a JSON response body.

### Features
1. Using Redis OM to add Redis into the application.
2. The password has been hashed to save in database by using `bcryptjs` to apply basic security standard.
3. Input validation has been applied, by using `express-validator` , to make sure that the data is in the right format.
4. Apply some basic sanitizers to prevent input from protential risks by Using `validator`.
5. Using `swagger-ui` to visualize and interact with the API's resources

### Potential Improvements
1. Redis is a caching system that works for temporarily storing information. Need a permanent database for production.
2. Tests should be added