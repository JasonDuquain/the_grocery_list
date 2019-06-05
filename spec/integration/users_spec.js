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
                    // check to make sure the user count did not increase - i.e that a new user was NOT added to the DB
                    expect(user).toEqual(totalUsers);
                    done(); 
                })
            });
        }); 
        
    });
    
    
    
}) ;