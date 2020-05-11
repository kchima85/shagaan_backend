/* eslint-env node, mocha */
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const expect = require('expect');
const request = require('supertest');
const express = require('express');

const app = express();
const url = 'http://localhost:8080';
const testInfo = {
  id: '',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

describe('Attendees route tests', () => {
  it('should test the /POST attendees route', (done) => {
    request(url)
      .post('/api/attendees')
      .type('form')
      .send({
        first_name: 'Test',
        last_name: 'Name',
        email: 'testname@gmail.com',
        phone_number: '19999999999',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].email).toEqual('testname@gmail.com');
        testInfo.id = res.body[0].attendee_id;
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /GET all attendees route', (done) => {
    request(url)
      .get('/api/attendees')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBeGreaterThanOrEqualTo(1);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /GET attendee by id', (done) => {
    request(url)
      .get(`/api/attendees/${testInfo.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].attendee_id).toEqual(testInfo.id);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /PUT attendees route', (done) => {
    request(url)
      .put(`/api/attendees/${testInfo.id}`)
      .type('form')
      .send({
        first_name: 'updated test',
        last_name: 'name',
        email: 'updatedtestname@gmail.com',
        phone_number: 'updated phone number',
        attendee_id: testInfo.id,
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].email).toEqual('updatedtestname@gmail.com');
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /DELETE attendees route', (done) => {
    request(url)
      .delete(`/api/attendees/${testInfo.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].attendee_id).toEqual(testInfo.id);
        expect(res.body[0].archived).toEqual(true);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});
