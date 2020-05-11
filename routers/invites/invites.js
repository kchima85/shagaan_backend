/* eslint no-param-reassign: ["error", { "props": false }] */
const express = require('express');
const pool = require('../../tools/pgConnect');
const uuid = require('uuid');
const fileReader = require('../../tools/fileReader')('./routers/invites/queries/');
const { MessagingResponse } = require('twilio').twiml;
const inviteCreation = require('./inviteCreation');
const rsvpResponseLogic = require('./rsvpResponseLogic');

const router = express.Router();

// create/send an invite to a person on a guestList
router.post('/', async (req, res, next) => {
  try {
    const attendeeInfo = await pool.query(fileReader.get_attendee_info, [
      req.body.attendee_id,
    ]);
    if (attendeeInfo.length < 1) {
      res.send('Attendee does not exist in the system.  Create the attendee first');
    }
    const inviteInfo = await pool.query(fileReader.get_invite_info, [
      req.body.event_id,
      req.query.user_id,
    ]);
    if (inviteInfo.length < 1) {
      res.send('Event does not exist in the system.  Create the event first');
    }
    inviteInfo.rows[0].first_name = attendeeInfo.rows[0].first_name;
    inviteInfo.rows[0].attendee_phone_number = attendeeInfo.rows[0].attendee_phone_number;
    const sid = await inviteCreation(inviteInfo.rows);
    if (sid) {
      // inserts row into guestslists_attendee table
      const createdInvite = await pool.query(fileReader.create_invite, [
        uuid(),
        req.body.guest_list_id,
        req.body.attendee_id,
        'invite sent',
      ]);
      res.send(createdInvite.rows);
    } else {
      res.send('An invite failed to send');
    }
  } catch (err) {
    next(err);
  }
});

// get all the invites a person sent for a guestlist by guest_list_id
router.get('/:glId', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_all_sent_invites_by_guestlist, [
      req.params.glId,
      req.query.user_id,
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_all_sent_invites_by_guestlist);
    next(err);
  }
});

// get a single invite by guestslists_attendee_id aka invite_id
router.get('/:glId/:glaId', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_invite_by_id, [
      req.params.glaId,
      req.query.user_id,
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_invite_by_id);
    next(err);
  }
});

// route to update a specific invite by guest_list_id / guestlists_attendees_id
router.put('/:glId/:glaId', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.update_invite_by_guestlist_attendee_id, [
      req.body.rsvp_status,
      req.body.amount_given,
      req.body.plus_ones,
      req.params.glaId,
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.update_invite_by_guestlist_attendee_id);
    next(err);
  }
});

// a route to accept the response from an attendee
router.post('/sms', async (req, res, next) => {
  const twiml = new MessagingResponse();

  function sendMsgToTwilio(msg) {
    twiml.message(msg);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }
  try {
    const msg = await rsvpResponseLogic(req);
    sendMsgToTwilio(msg);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
