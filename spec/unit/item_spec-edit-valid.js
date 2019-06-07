const request = require('request');
const server = require('../../server');
const expressBaseUrl = 'http://localhost:8080';
const Item = require('../../database/models/item');
const User = require('../../database/models/user');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;


describe('routes : items/update/:id', () => {
    
  beforeAll(done => {
    this.item;
    new Item({
      name: 'test tea',
      quantity: 10
    })
      .save()
      .then(item => {
        this.item = item;
        console.log(this.item._id)
        done();
      })
      .catch(err => console.log(err));
  });    

   describe('POST /items/update/:id', () => {
       
        it('should edit an item and return a 200 server response', (done) => {
            
            request.post({
                url: `${expressBaseUrl}/items/update/${this.item._id}`,
                form: {
                   name: 'test coffee',
                   quantity: 12,
                }
                
            }, (error, response) => {
                
                done();
                
                Item.find()
                .then(item => {
                    expect(response.statusCode).toBe(200);
                    expect(item.name).toBe('test coffee');
                    expect(error).toBeNull();
                    done(); 
                    
                    /**** moving here as calling in afterAll or afterEach results in fails ****/
                    Item.deleteMany({})
                    .then(() => {
                        done();
                    })
                    .catch((err) => {
                      console.log(err);
                      done();
                    });
                    
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
   
            });
        }); 
        
    }); 

});

/* DELETE TESTS
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
            
            request.post(`${expressBaseUrl}/delete/`, (error, response) => {
                
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
        
    });
    
});


*/

