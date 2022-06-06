


// imports
import ServerApp from "../server";
import request from 'supertest';
import { expect } from "chai";
import MongoConnection from '../database/mongoConnection';


// tests for general error routes
describe('General error routes', () => {

     const conn = new MongoConnection();
     const app = ServerApp(conn);

     it('should have a general error route', async () => {
          const response = await request(app).get('/api/error');
          expect(response.statusCode).to.be.equal(400);
          expect(response.body.msg).to.exist;
     });

     it('should return error messages', async () => {
          const response = await request(app).get('/api/error/test-case');
          expect(response.statusCode).to.be.equal(400);
          expect(response.body.msg).to.be.eql('test-case');
     });
});


describe('running error pages test', () => {
     const conn = new MongoConnection();
     const app = ServerApp(conn);

     const testCases = ['/test', '/api/test', '/api/v2/test'];

     testCases.forEach((test) => {
          it('should return true', async () => {
               const response = await request(app).get(test);
               expect(response.statusCode).to.be.equal(404);
          });

          it('should return exists', async () => {
               const response = await request(app).get(test);
               expect(response.body.msg).to.not.be.undefined;
          });
     });
});


// test for authentication routes
describe.skip('Authentication routes', () => {});