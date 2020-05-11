const matchRsvpToInvite = require('./matchRsvpToInvite');
const multipleInvites = require('./multipleInvites');
const pool = require('../../tools/pgConnect');
const fileReader = require('../../tools/fileReader')('./routers/invites/queries/');
const uuid = require('uuid');

let responseToRsvp = '';

async function responseLogic(req) {
  const rsvp = req.body.Body.toLowerCase();
  const attendeesNumber = req.body.From;

  // checks rsvp if it matches one of the possibilities.
  if (!rsvp.match(/(yes [0-9]{1,2}|no|^[1-9] [1-9])/)) {
    responseToRsvp = 'Please enter a valid rsvp response. Yes number of plus one\'s or No';
    return responseToRsvp;
  }
  const rsvpEventMatch = await matchRsvpToInvite(attendeesNumber);

  if (rsvpEventMatch.length === 0) {
    responseToRsvp = 'No Pending Event Invites. Please contact the event host';
    return responseToRsvp;
  } else if (rsvpEventMatch.length === 1 && rsvp.match(/yes [0-9]{1,2}/)) {
    // logic when attendee is invite to only one event
    const splitRsvp = rsvp.split(' ');

    // creates row in events_attendees
    pool.query(fileReader.create_events_attendees, [
      uuid(),
      rsvpEventMatch[0].event_id,
      rsvpEventMatch[0].attendee_id,
    ]);

    // creates row in guestlists_attendees
    pool.query(fileReader.update_invite_by_guestlist_attendee_id, [
      splitRsvp[0],
      null,
      splitRsvp[1],
      rsvpEventMatch[0].guestlists_attendee_id,
    ]);

    responseToRsvp = 'Thank you for the RSVP';
    return responseToRsvp;
  } else if (rsvp.match(/no/)) {
    // updates guestlists_attendees with no
    pool.query(fileReader.update_invite_by_guestlist_attendee_id, [
      rsvp,
      null,
      null,
      rsvpEventMatch[0].guestlists_attendee_id,
    ]);

    responseToRsvp = 'Thank you for the RSVP. Sorry that you can not make it';
    return responseToRsvp;
  }

  if (rsvp.match(/^[1-9] [1-9]/)) {
    // logic to handle if attendee has been invite to more than one event
    const splitRsvp = rsvp.split(' ');
    const eventNum = parseInt(splitRsvp[0], 10) - 1;
    try {
      pool.query(fileReader.create_events_attendees, [
        uuid(),
        rsvpEventMatch[eventNum].event_id,
        rsvpEventMatch[eventNum].attendee_id,
      ]);

      pool.query(fileReader.update_invite_by_guestlist_attendee_id, [
        'yes',
        null,
        splitRsvp[1],
        rsvpEventMatch[eventNum].guestlists_attendee_id,
      ]);
    } catch (err) {
      throw err;
    }

    responseToRsvp = `Thank you for the RSVP to ${rsvpEventMatch[eventNum].name_of_event}`;
    return responseToRsvp;
  }
  // function to create resposne if attendee has been invite to multiple events.
  const multipleEventMsg = await multipleInvites(rsvpEventMatch);
  return multipleEventMsg;
}

module.exports = responseLogic;
