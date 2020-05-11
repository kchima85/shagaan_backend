/* eslint-env node, mocha */
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const expect = require('expect');
const request = require('supertest');
const express = require('express');

const app = express();
const url = 'http://localhost:8080';
const testInfo = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

describe('Users route tests', () => {
  it('should test the /POST users route', (done) => {
    request(url)
      .post('/api/users')
      .type('form')
      .send({
        first_name: 'Test',
        last_name: 'Name',
        email: 'testname@gmail.com',
        phone_number: 'test phone number',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].first_name).toEqual('Test');
        testInfo.user_id = res.body[0].user_id;
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /GET all users route', (done) => {
    request(url)
      .get('/api/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBeGreaterThanOrEqualTo(1);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /GET a user by id route', (done) => {
    request(url)
      .get(`/api/users/${testInfo.user_id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].user_id).toEqual(testInfo.user_id);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /PUT users route', (done) => {
    request(url)
      .put(`/api/users/${testInfo.user_id}`)
      .type('form')
      .send({
        first_name: 'updated test',
        last_name: 'updated test',
        email: 'updatetestemail@gmail.com',
        phone_number: 'updated test phone number',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].user_id).toEqual(testInfo.user_id);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /DELETE users route', (done) => {
    request(url)
      .delete(`/api/users/${testInfo.user_id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].user_id).toEqual(testInfo.user_id);
        expect(res.body[0].archived).toEqual(true);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});
