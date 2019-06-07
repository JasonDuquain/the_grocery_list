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
       
       it('should NOT edit an item and return a 400 server response', (done) => {
            
            request.post({
                url: `${expressBaseUrl}/items/update/${this.item._id}`,
                form: {
                   what: 'test fail',
                   no: 1,
                }
                
            }, (error, response) => {
                
                done();
                
                Item.find()
                .then(item => {
                    expect(response.statusCode).toBe(400);
                    expect(item.name).not.toBe('test fail');
                    expect(error).not.toBeNull();
                    done(); 
                    
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








