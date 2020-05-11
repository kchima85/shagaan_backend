/* eslint-env node, mocha */
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */

const expect = require('expect');
const request = require('supertest');
const express = require('express');

const app = express();
const url = 'http://localhost:8080';
const testInfo = {
  user_id: '8660c554-f9f3-45ea-a42f-881e8d20af4e',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

describe('Invites route tests', () => {
  it('should test the /POST invites', (done) => {
    request(url)
      .post('/api/invites')
      .query({ user_id: testInfo.user_id })
      .type('form')
      .send({
        attendee_id: '335bfa4e-4bd0-11e7-b114-b2f933d5fe66',
        event_id: '334c1ae1-f348-4aaf-acf8-fdb1ee9cab72',
        guest_list_id: '9813946f-5a42-4656-bc19-e87044132d2c',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        testInfo.guest_list_id = res.body[0].guest_list_id;
        testInfo.guestlists_attendee_id = res.body[0].guestlists_attendee_id;
      })
      .end((err) => {
        if (err) throw err;
        setTimeout(done(), 5000);
      });
  });

  it('should test that /GET all invites by guest_list_id', (done) => {
    request(url)
      .get(`/api/invites/${testInfo.guest_list_id}`)
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

  it('should test the /GET an invite by guestlists_attendee_id', (done) => {
    request(url)
      .get(`/api/invites/${testInfo.guest_list_id}/${testInfo.guestlists_attendee_id}`)
      .query({ user_id: testInfo.user_id })
      .expect(200)
      .expect((res) => {
        expect(res.body[0].guestlists_attendee_id).toEqual(testInfo.guestlists_attendee_id);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test /PUT invites', (done) => {
    request(url)
      .put(`/api/invites/${testInfo.guest_list_id}/${testInfo.guestlists_attendee_id}`)
      .type('form')
      .send({
        guestlists_attendee_id: testInfo.guestlists_attendee_id,
        rsvp_status: 'invite sent',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0].guestlists_attendee_id).toEqual(testInfo.guestlists_attendee_id);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it('should test respond to invite route', (done) => {
    request(url)
      .post('/api/invites/sms')
      .type('form')
      .send({
        Body: 'Yes 1',
        From: '12095526289',
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0]);
      })
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});
