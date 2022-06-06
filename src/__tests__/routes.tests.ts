


// imports
import ServerApp from "../server";
import request from 'supertest';
import { expect } from "chai";


describe('General error routes', () => {

     const app = ServerApp();

     it('should have a general error route', async () => {
          const response = await request(app).get('/api/error');
          expect(response.statusCode).to.be.equal(400);
          expect(response.body.msg).to.exist;
     });

     it('should have a handler for error pages', () => {
          const testCases = ['/test', '/api/test', '/api/v2/test'];

          testCases.forEach(async (testCase: string) => {
               const response = await request(app).get(testCase);
               expect(response.statusCode).to.be.equal(404);
               expect(response.body.msg).to.include('page not found');
          });
     });

     it('should return error messages', async () => {
          const response = await request(app).get('/api/error/test-case');
          expect(response.statusCode).to.be.equal(400);
          expect(response.body.msg).to.be.eql('test-case');
     });
});