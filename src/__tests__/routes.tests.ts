


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

     it('should have a handler for error pages', async () => {
          const testCases = ['/test', '/api/test', '/api/v2/test'];

          const response = await request(app).get(testCases[0]);
          expect(response.statusCode).to.be.equal(404);
          expect(response.body.msg).to.exist;
     });

     it('should return error messages', async () => {
          const response = await request(app).get('/api/error/test-case');
          expect(response.statusCode).to.be.equal(400);
          expect(response.body.msg).to.be.eql('test-case');
     });
});



// test for authentication routes
describe.skip('Authentication routes', () => {});