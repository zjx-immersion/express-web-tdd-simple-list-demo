var request = require('supertest');
var app = require('./app');

describe("Request to the root path", () => {

    it("Request a get for returning 200 code", (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((error) => {
                if (error) throw error;
                // console.log('Done');
                done();
            });
    });

});