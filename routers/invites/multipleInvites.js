function multipleInvites(matchedEvents) {
  const matchedEventMessage = matchedEvents.map((event, i) => {
    const eventNum = i + 1;
    return `${eventNum}. ${event.name_of_event}`;
  });
  return `You have been invited to multiple events!\nWhich event are you rsvping to \n${matchedEventMessage.join(', \n')}
Please respond with number listed next to the event and your plus one's. Leave a space after event number`;
}

module.exports = multipleInvites;
