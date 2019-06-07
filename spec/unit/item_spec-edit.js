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
      quantity: 10,
      purchased: false
    })
      .save()
      .then(item => {
        this.item = item;
        
        console.log('1');
        
        done();
      })
      .catch(err => console.log(err));
  });    

   describe('POST /items/update/:id', () => {
       
        it('should edit an item and return a 200 server response', (done) => {
            
            console.log('2');
            
            request.post({
                url: `${expressBaseUrl}/items/update/${this.item._id}`,
                form: {
                    name: 'test coffee',
                    quantity: 12,
                    purchased: false
                }
                
            }, (error, response) => {
                
                console.log('3');
                //console.log(response)
                
                done();
                
                Item.find()
                .then(item => {
                    
                    console.log('4');
                    console.log(item);
                    
                    expect(response.statusCode).toBe(200);
                    
                    /***** 
                    there is only one item to must use item[] 
                    *****/
                    expect(item[0].name).toBe('test coffee');
                    expect(error).toBeNull();
                    done(); 
                    
                    console.log('4a');
                    
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
   
            });
        }); 
       
       it('should NOT edit an item and return a 400 server response', (done) => {
            
            request.post({
                url: `${expressBaseUrl}/items/update/${this.item._id}`,
                form: {
                   what: 'doesnt matter',
                   no: 1,
                }
                
            }, (error, response) => {
                
                done();
                
                Item.find()
                .then(item => {
                    expect(response.statusCode).toBe(400);
                    expect(item[0].name).not.toBe('doesnt matter');
                    expect(item[0].name).toBe('test coffee');
                    expect(error).toBeNull();
                    done(); 
                    
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
  
            });
        }); 
        
    });
    
    afterAll(done => {
        Item.deleteMany({})
        .then(() => {
            
            console.log('5');
            
            done();
        })
        .catch((err) => {
            done();
        });             
    })

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

