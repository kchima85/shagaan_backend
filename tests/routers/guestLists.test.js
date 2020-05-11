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

describe('guestlists route test', () => {
  it('should test the /POST guestlists route', (done) => {
    request(url)
      .post('/api/guestlists')
      .type('form')
      .send({
        event_id: '334c1ae1-f348-4aaf-acf8-fdb1ee9cab72',
        created_by: '8660c554-f9f3-45ea-a42f-881e8d20af4e',
        guest_list_name: 'Test Name',
        created_at: 'now()',
        last_updated: 'now()',
        num_of_guests: 5,
        archived: 'false',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].guest_list_name).toEqual('Test Name');
        testInfo.guest_list_id = res.body[0].guest_list_id;
        testInfo.event_id = res.body[0].event_id;
        testInfo.user_id = res.body[0].created_by;
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /GET all guestlists route', (done) => {
    request(url)
      .get('/api/guestlists')
      .query({ user_id: testInfo.user_id })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBeGreaterThanOrEqualTo(1);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /GET guestlists by id route', (done) => {
    request(url)
      .get(`/api/guestlists/${testInfo.guest_list_id}`)
      .query({ user_id: testInfo.user_id })
      .expect(200)
      .expect((res) => {
        expect(res.body[0].event_id).toEqual(testInfo.event_id);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /PUT guestlists route', (done) => {
    request(url)
      .put(`/api/guestlists/${testInfo.guest_list_id}`)
      .query({ user_id: testInfo.user_id })
      .type('form')
      .send({
        event_id: '334c1ae1-f348-4aaf-acf8-fdb1ee9cab72',
        created_by: '8660c554-f9f3-45ea-a42f-881e8d20af4e',
        guest_list_name: 'Updated Test Name',
        created_at: 'now()',
        last_updated: 'now()',
        num_of_guests: 5,
        archived: 'false',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].guest_list_name).toEqual('Updated Test Name');
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /DELETE guestlists route', (done) => {
    request(url)
      .delete(`/api/guestlists/${testInfo.guest_list_id}`)
      .query({ user_id: testInfo.user_id })
      .expect(200)
      .expect((res) => {
        expect(res.body[0].guest_list_id).toEqual(testInfo.guest_list_id);
        expect(res.body[0].archived).toEqual(true);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});
