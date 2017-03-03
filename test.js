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

describe('Listen to the /cities', () => {
    it('Return 200 code status', (done) => {
        request(app).get('/cities').expect(200, done);
    });

    it('Reture JSON format', (done) => {
        request(app)
            .get('/cities')
            .expect("Content-Type", /json/)
            .end((err) => {
                if (err) throw err;
                done();
            });
    });

    it('Get initial cities', (done) => {
        request(app)
            .get('/cities')
            .expect(JSON.stringify(['Lotopia', 'Caspiana', 'Indigo']), done);
    })
});

describe('Listen to the root path', () => {
    it('Returen 200 status code', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('Returen HTML format', (done) => {
        request(app)
            .get('/')
            .expect("Content-Type", /html/, done);
    });

    it('Returen an Index file with cities', (done) => {
        request(app)
            .get('/')
            .expect(/cities/i, done);
    });
});