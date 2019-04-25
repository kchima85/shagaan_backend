const pool = require('../../tools/pgConnect');
const fileReader = require('../../tools/fileReader')('./routers/invites/queries/');

async function matchRsvpToInvite(attendeePhoneNumber) {
  const [formattedNumber] = attendeePhoneNumber.match(/[0-9]+/);

  try {
    const matches = await pool.query(fileReader.get_invites, [
      formattedNumber,
    ]);
    return matches.rows;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = matchRsvpToInvite;
