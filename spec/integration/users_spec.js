const request = require('request');
const server = require('../../server');
const expressBaseUrl = 'http://localhost:8080';
const User = require('../../database/models/user');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;


// beforeAll NOT beforeEach!!!!!!!!!!
beforeAll((done) => {

    User.deleteMany({})
    .then(() => {
        done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
    
});


// CREATE TESTS FOR HOME PAGE ACCESS ONCE IT HAS THE CORRECT CONTENT!!

describe('routes: /signup', () => {
    
    describe('POST /user', () => {
        it('should add a user to the DB', (done) => {
            request.post({
                url: `${expressBaseUrl}/user`,
                form: {
                   username: 'jef',
                   password: 'jef',
                   confirmPassword: 'jef' 
                }
                
            }, (error, response) => {
                User.findOne({ username: 'jef' })
                .then(user => {
                    expect(user).not.toBeNull();
                    expect(user.username).toBe('jef');
                    expect(error).toBeNull();
                    done(); 
                })
            });
        }); 
        
        it('should NOT add a user with a username already in DB', (done) => {
            
            let totalUsers = 0;
            
            User.find().count()
            .then(users => {
                totalUsers = users;
            });
            
            request.post({
                url: `${expressBaseUrl}/user`,
                form: {
                   username: 'jef',
                   password: 'jef',
                   confirmPassword: 'jef' 
                }
            }, (error, response) => {
                User.find().count()
                .then(user => {
                    expect(user).toEqual(totalUsers);
                    done(); 
                })
            });
        }); 
        
    });
    

});

//** make sure the beforeAll does not mess these up..if so move to another file

describe('routes: /login', () => {

    describe('POST /user/login', () => {
        
        it('should log a user in with valid credentials and create a session', (done) => {
            request.post({
                url: `${expressBaseUrl}/user/login`,
                form: {
                   username: 'jef',
                   password: 'jef' 
                }
                
            }, (error, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.sessionID).not.toBeNull();
                done(); 
            });
        }); 
        
        it('should NOT log a user in with invalid creds and should not create a session', (done) => {
            request.post({
                url: `${expressBaseUrl}/user/login`,
                form: {
                   username: 'no',
                   password: 'way' 
                }
                
            }, (error, response) => {
                expect(response.statusCode).toBe(401);
                expect(response.sessionID).toBeUndefined();
                done(); 
            });
        }); 
        
    });
    
    describe('POST /user/logout', () => {
        
        it('should logout a user with a valid session', (done) => {
            request.post(`${expressBaseUrl}/user/logout`, (error, response) => {
                expect(response.statusCode).toBe(200);
                done(); 
            });
        }); 
        
        
        
    });
    
});