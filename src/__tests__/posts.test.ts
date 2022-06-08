


// imports
import request from 'supertest';
import DevelopmentAPI from '../database/developmentConnection';
import ServerApp from '../server';
import { expect } from 'chai';


describe('Authentication tests', () => {

     const API = {
          login: '/api/v2/auth/login',
          user: '/api/v2/users/daniel@gmail.com',
     }

     const data = {
          email: 'daniel@gmail.com',
          password: 'daniel'
     }
     
     const conn = new DevelopmentAPI();
     const app = ServerApp(conn);

     it('');
});