let server = require('../app');
let chai = require('chai');
let chaiHttp = require('chai-http');

// Assertion
chai.should();
chai.use(chaiHttp);

let token;

describe('User APIs', () => {

    // describe('Test POST route /api/user/register', () => {
    //     it('It should register a user and return its details', (done) => {
    //         chai.request(process.env.HOST)
    //             .post('/api/user/register')
    //             .send({
    //                 'firstName': 'Shivam',
    //                 'lastName': 'Dube',
    //                 'email': 'shuvam.dubetest@yopmail.com',
    //                 'phone': '+919663325587',
    //                 'password': 'secret123',
    //                 'userRole': 1
    //             })
    //             .end((err, res) => {
    //                 if(err) return done(err)
    //                 res.should.have.status(200);
    //                 res.body.response.should.be.a('object');
    //                 // res.body.response.should.have.property('_id');
    //                 res.body.response.should.have.property('firstName');
    //                 res.body.response.should.have.property('lastName');
    //                 res.body.response.should.have.property('email');
    //                 res.body.response.should.have.property('phone');
    //                 res.body.response.should.have.property('password');
    //                 res.body.response.should.have.property('userRole');
    //                 done();
    //             });
    //     }).timeout(20000);
    // });

    describe('Test POST route /api/user/login', () => {
      it('It should login user and return its details', (done) => {
          chai.request(process.env.HOST)
              .post('/api/user/login')
              .send({
                  'email': 'sumitkbtestnode@yopmail.com',
                  'password': 'secret123',
              })
              .end((err, res) => {
                  if(err) return done(err)
                  res.should.have.status(200);
                  res.header.should.have.property('x-access-token');
                  token = res.header['x-access-token'];
                  res.body.response.should.be.a('object');
                  res.body.response.should.have.property('_id');
                  res.body.response.should.have.property('firstName');
                  res.body.response.should.have.property('lastName');
                  res.body.response.should.have.property('email');
                  res.body.response.should.have.property('phone');
                  res.body.response.should.have.property('userRole');
                  done();
              });
      }).timeout(20000);
  });
});

describe('Application APIs', () => {

    describe('Test GET route /api/application/index', () => {
        it('It should return all applications created by a particular user', (done) => {
            chai.request(process.env.HOST)
                .get('/api/application/index')
                .set({ 'authorization': `Bearer ${token}`})
                .send({'userId' : '61f1615176bd8e18373516e5'})
                .end((err, res) => {
                    if(err) return done(err)
                    res.should.have.status(200);
                    res.body.response.should.be.a('array');
                    res.body.response.length.should.not.be.eq(0);
                    // res.body.response.length.should.be.eq(0);
                    done();
                });
        }).timeout(10000);
    });

});

/*
describe('API Tests', function() {
    before(function() {
      mongoose.createConnection('mongodb://localhost/bot-test', myOptionsObj);
    });
  
    beforeEach(function(done) {
      // I do stuff like populating db
    });
  
    afterEach(function(done) {
      // I do stuff like deleting populated db
    });
  
    after(function() {
      mongoose.connection.close();
    });
  
    describe('Application', function() {
  
      it.only('should should return all applications created by a particular user on /api/application/index GET', function(done) {
        chai.request(server)
          .get('/api/application/index')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
  
      // the rest of the tests would continue here...
  
    });
  
});
*/

