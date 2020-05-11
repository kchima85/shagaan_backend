const client = require('../../tools/twilio');

async function createInvite(info) {
  const inviteInfo = info[0];
  try {
    // saving to result to save sid from twilio
    // sid is the id of the text that twilio sent
    const result = await client.messages.create({
      to: inviteInfo.attendee_phone_number,
      from: +15597953836,
      body:
      `${inviteInfo.first_name} you have been invited to ${inviteInfo.name_of_event} by ${inviteInfo.user_first_name} ${inviteInfo.user_last_name}.  Please respond with yes and the approx guests or no.  For more information reach out at ${inviteInfo.user_phone_number}`,
    });
    return result.sid;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = createInvite;
