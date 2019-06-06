
const request = require('request');
const server = require('../../server');
const expressBaseUrl = 'http://localhost:8080';
const Item = require('../../database/models/item');
const User = require('../../database/models/user');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;


// add a mock auth if this method is not good enough!!!

beforeAll((done) => {

    User.deleteMany({})
    .then(() => {
        done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
    
    request.post({
        url: `${expressBaseUrl}/user`,
        form: {
           username: 'jef',
           password: 'jef',
           confirmPassword: 'jef' 
        }

    }, (error, response) => {
        console.log('one user in db');
    });
    
    Item.deleteMany({})
    .then(() => {
        done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
    
});


describe('routes: /items', () => {

    describe('POST /items/add', () => {
        
        it('should add a new item to the db and return a 201 server response', (done) => {
            request.post({
                url: `${expressBaseUrl}/items/add`,
                form: {
                   name: 'eggs',
                   quantity: 12,
                   purchased: false 
                }
                
            }, (error, response) => {
                //console.log(Item)
                
                done();
                
                Item.find()
                .then(item => {
                    expect(response.statusCode).toBe(201);
                    expect(item[0].name).toBe('eggs');
                    expect(error).toBeNull();
                    done(); 
                })
            });
        }); 
        
        it('should NOT add a new item to the db that does not have the correct parameters and return an error', (done) => {
            request.post({
                url: `${expressBaseUrl}/items/add`,
                form: {
                   invalid: 'milk',
                   no: 2,
                   deny: false 
                }
                
            }, (error, response) => {
                Item.find()
                .then(item => {
                    expect(response.statusCode).toBe(400);
                    //expect(error).not.toBeNull();
                    done(); 
                })
            });
        }); 
        
    });
    
    describe('GET /items/', () => {
        
        it('should return the item from the db with a 200 server response', (done) => {
            request.get(`${expressBaseUrl}/items/`, (error, response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain('eggs');
                expect(error).toBeNull();
                done(); 
            }); 
        
        });
        
        //// make sure the call to request is inside the then fn (async!)
        it('should NOT return an item that is not in the db but will return an empty arr', (done) => {
            
            Item.deleteMany({})
            .then(() => {
                done(); // 
                
                request.get(`${expressBaseUrl}/items/`, (error, response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.length).toBeNull();
                    expect(error).toBeNull();
                    done(); 
                });
                
            }) 
            .catch((err) => {
              console.log(err);
              done();
            });
            
        });
    
    });
    
    
});


