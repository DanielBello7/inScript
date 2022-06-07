


// imports
import request from 'supertest';
import DevelopmentAPI from '../database/developmentConnection';
import ServerApp from '../server';
import { expect } from 'chai';


describe('Authentication tests', () => {

     const API = {
          login: '/api/v2/auth/login',
          logout: '/api/v2/auth/logout',
          user: '/api/v2/auth/user'
     }

     const data = {
          email: 'daniel@gmail.com',
          password: 'daniel'
     }
     
     const conn = new DevelopmentAPI();
     const app = ServerApp(conn);

     it('should return a 200 on a successful login', async () => {
          const response = await request(app).post(API.login).send(data);
          expect(response.statusCode).to.be.equal(200);
     });

     it('should return a 400 with a message on failed login', async () => {
          const data = {
               email: 'daniel@gmail.com',
               passowrd: 'david'
          }

          const response = await request(app).post(API.login).send(data);

          expect(response.statusCode).to.be.equal(400);

          expect(response.body.msg).to.exist;
     });

     it('should return the current user', async () => {
          const response = await request(app).post(API.login).send(data);
          
          const user = await request(app).get(API.user).set('Authorization', `Bearer: ${response.body.payload.token}`);

          expect(user.body.payload).to.be.an('object').that.contains.keys('email', 'firstName');
     });

     it('should log the user out', async () => {
          const response = await request(app).post(API.login).send(data);
          
          const logoutResponse = await request(app).get(API.logout).set('Authorization', `Bearer: ${response.body.payload.token}`);

          expect(logoutResponse.statusCode).to.be.equal(200);
     });

     it('should check for parameters', async () => {
          const data = {
               email: 'daniel@gmail.com'
          }

          const response = await request(app).post(API.login).send(data);

          expect(response.statusCode).to.be.equal(400);
     });

     it('should return a 401 if no token is passed', async () => {
          const response = await request(app).get(API.user);

          expect(response.statusCode).to.be.equal(401);
     });
});