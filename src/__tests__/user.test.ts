


// imports
import request from 'supertest';
import DevelopmentAPI from '../database/developmentConnection';
import ServerApp from '../server';
import { expect } from 'chai';


describe('Authentication tests', () => {

     const API = {
          login: '/api/v2/auth/login',
          users: '/api/v2/users',
          user: '/api/v2/users/daniel@gmail.com',
          modify: '/api/v2/users/modify',
          delete: '/api/v2/users/delete'
     }

     const data = {
          email: 'daniel@gmail.com',
          password: 'daniel'
     }
     
     const conn = new DevelopmentAPI();
     const app = ServerApp(conn);

     it('should send a list of users', async () => {
          const response = await request(app).get(API.users);
          expect(response.statusCode).to.be.equal(200);
          expect(response.body.payload.results).to.have.lengthOf.at.least(3);
     });

     it('should return back a user', async () => {
          const loginRes = await request(app).post(API.login).send(data);

          const response = await request(app)
          .get(API.user)
          .set('Authorization', `Bearer: ${loginRes.body.payload.token}`);


          expect(response.statusCode).to.be.equal(200);

          expect(response.body.payload).to.have.keys('email', 'firstName', 'lastName', '_id');

          expect(response.body.payload).to.have.property('email').that.is.eql(data.email);
     });

     it('should modify the user data', async () => {

          const modifyData = {
               firstName: 'joshua'
          }

          const firstRes = await request(app).post(API.login).send(data);

          const response = await request(app)
          .get(API.user)
          .send(modifyData)
          .set('Authorization', `Bearer: ${firstRes.body.payload.token}`);

          expect(response.statusCode).to.be.equal(200);


          const testRes = await request(app).get(API.user)
          .set('Authorization', `Bearer: ${firstRes.body.payload.token}`);

          // expect(testRes.body.payload.firstName).to.be.eql(modifyData.firstName);
     });

     it('should delete the user', async () => {

          const response = await request(app).post(API.login).send(data);

          const delRes = await request(app)
          .delete(API.delete)
          .set('Authorization', `Bearer: ${response.body.payload.token}`);

          expect(delRes.statusCode).to.be.equal(200);

          const userRes = await request(app)
          .get(API.user)
          .set('Authorization', `Bearer: ${response.body.payload.token}`);

          // expect(userRes.body.payload).to.be.empty;
     });
})