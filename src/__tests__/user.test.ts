


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
})