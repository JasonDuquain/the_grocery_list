const request = require('request');
const server = require('../../server');
const expressBaseUrl = 'http://localhost:8080';
const Item = require('../../database/models/item');
const User = require('../../database/models/user');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;




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

});

beforeAll((done) => {
    request.post({
        url: `${expressBaseUrl}/items/add`,
        form: {
           name: 'eggs',
           quantity: 12,
           purchased: false 
        }

    }, (error, response) => {
        //console.log(Item)  
    });

});


describe('routes: /items/delete', () => {

    
    
    
    
    describe('DELETE /items/delete/:id', () => {
        
        it('should delete the item from the db with a 200 server response', (done) => {
            
            let totalItems = 0;
            
            Item.find()
            .then(items => {
                console.log(items)
                totalItems = items;
                done();
            })
            
            /*request.post(`${expressBaseUrl}/delete/`, (error, response) => {
                
                done();
                
                Item.find()
                .then(item => {
                    expect(response.statusCode).toBe(201);
                    expect(item[0].name).toBe('eggs');
                    expect(error).toBeNull();
                    done(); 
                })
            });*/
        
        });
        
        
    
    });
    
});

/*

Item.deleteMany({})
    .then(() => {
        done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });


*/






