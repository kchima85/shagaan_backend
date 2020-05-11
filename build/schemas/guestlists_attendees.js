module.exports = {
  guestlists_attendee_id: 'uuid PRIMARY KEY',
  guest_list_id: 'uuid',
  attendee_id: 'uuid',
  created_at: 'timestamp with time zone',
  amount_given: 'bigint',
  rsvp_status: 'varchar(40)',
  rsvp_time_stamp: 'timestamp with time zone',
  plus_ones: 'smallint',
  archived: 'boolean',
};
