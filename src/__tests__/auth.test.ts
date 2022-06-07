


// imports
import request from 'supertest';
import DevelopmentAPI from '../database/developmentConnection';
import { expect } from 'chai';
import ServerApp from '../server';


describe('Authentication tests', () => {
     
     const conn = new DevelopmentAPI();
     const app = ServerApp(conn);

     it('should return a 200 on a successful login', async () => {
          const data = {
               email: 'daniel@gmail.com',
               password: 'daniel'
          }
          const response = await request(app).post('/api/v2/auth/login').send(data);

          console.log(response.body);
          expect(response.statusCode).to.be.equal(200);
     });
});