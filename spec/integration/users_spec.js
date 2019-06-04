const request = require('request');
const server = require('../../server');
const base = 'http://localhost:8080';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;



/// add a beforeEach here for any db call or anything that is repeated in the specs and require any DB or other files needed




describe('routes: /signup', () => {
    
    describe('GET /test', () => {
        it('should return a signup page', (done) => {
            request(`${base}/******`, (error, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain('Signup');
                expect(error).toBeNull();
                done();
            });
        }); 
    });
    
    
    
}) ;