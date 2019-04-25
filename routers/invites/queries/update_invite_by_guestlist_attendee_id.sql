update
  guestlists_attendees
set
  rsvp_status = $1::text,
  rsvp_time_stamp = now(),
  amount_given = $2::int,
  plus_ones = $3::int
where
  guestlists_attendee_id = $4::uuid
returning *;