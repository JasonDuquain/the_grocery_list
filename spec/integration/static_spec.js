const request = require('request');
const server = require('../../server');
const base = 'http://localhost:8080';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;


//setup first basic test to ensure testing functionality - working

/*

describe('routes: /', () => {
    
    describe('GET /test', () => {
        it('should return status code 200', (done) => {
            request(`${base}/test`, (error, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain('working');
                expect(error).toBeNull();
                done();
            });
        }); 
    }) 
    
}) 

*/

