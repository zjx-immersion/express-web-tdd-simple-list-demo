var request = require('supertest');
var app = require('./app');
var redis = require('redis');
var client = redis.createClient()
client.select('test'.length);
client.flushall();

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
            // .expect(JSON.stringify(['Lotopia', 'Caspiana', 'Indigo']), done);
            .expect(JSON.stringify([]), done)
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

describe('Creating new cities', () => {
    it('Return the 201 status code', (done) => {
        request(app)
            .post('/cities')
            .send('name=Springfield&description=where+the+simpsons+live')
            .expect(201, done);
    });

    it('Return the city name', (done) => {
        request(app)
            .post('/cities')
            .send('name=Springfield&description=where+the+simpsons+live')
            .expect(/Springfield/i, done);
    });
});

describe('Delete the citye', () => {

    beforeEach(() => {
        client.hset('cities', 'chengdu', 'Beautiful city in China');
    });

    it('Return 204 code when delete some city', (done) => {
        request(app)
            .delete('/cities/chengdu')
            .expect(204, done);
    });

    afterEach(() => {
        client.flushall();
    })
});