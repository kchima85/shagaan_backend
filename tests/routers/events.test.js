/* eslint-env node, mocha */
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const expect = require('expect');
const request = require('supertest');
const express = require('express');

const app = express();
const url = 'http://localhost:8080';
const testInfo = {
  id: '',
  user_id: '8660c554-f9f3-45ea-a42f-881e8d20af4e',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

describe('Events route tests', () => {
  it('should test the /POST events route', (done) => {
    request(url)
      .post('/api/events')
      .type('form')
      .send({
        name_of_event: 'test',
        created_by: '8660c554-f9f3-45ea-a42f-881e8d20af4e',
        date: '1985/09/29',
        address: '5847 california st apt a',
        city: 'San Francisco',
        postal_code: '94121',
        start_time: '12:00:00',
        end_time: '02:00',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].name_of_event).toEqual('test');
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /GET all events route', (done) => {
    request(url)
      .get('/api/events')
      .query({ user_id: testInfo.user_id })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBeGreaterThanOrEqualTo(1);
        res.body.forEach((event) => {
          if (event.name_of_event === 'test') {
            testInfo.id = event.event_id;
          }
        });
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /GET event by id', (done) => {
    request(url)
      .get(`/api/events/${testInfo.id}`)
      .query({ user_id: testInfo.user_id })
      .expect(200)
      .expect((res) => {
        expect(res.body[0].event_id).toEqual(testInfo.id);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /PUT events route', (done) => {
    request(url)
      .put(`/api/events/${testInfo.id}`)
      .query({ user_id: testInfo.user_id })
      .type('form')
      .send({
        name_of_event: 'updated',
        created_by: '8660c554-f9f3-45ea-a42f-881e8d20af4e',
        date: '1985/09/29',
        address: '5847 california st apt a',
        postal_code: '94121',
        start_time: '12:00:00',
        end_time: '02:00',
        event_id: 'ceb1161c-4c86-11e7-b114-b2f933d5fe66',
        city: 'San Francisco',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].name_of_event).toEqual('updated');
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test the /DELETE route', (done) => {
    request(url)
      .delete(`/api/events/${testInfo.id}`)
      .query({ user_id: testInfo.user_id })
      .expect(200)
      .expect((res) => {
        expect(res.body[0].event_id).toEqual(testInfo.id);
        expect(res.body[0].archived).toEqual(true);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});
