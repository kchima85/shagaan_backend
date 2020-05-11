insert into guestlists_attendees
  (guestlists_attendee_id, guest_list_id, attendee_id, created_at,
  rsvp_status, rsvp_time_stamp, archived)
values
  ($1::uuid, $2::uuid, $3::uuid, now(), $4::text, now(), false)
returning *;