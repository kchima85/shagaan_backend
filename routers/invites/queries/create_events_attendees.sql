insert into events_attendees
  (events_attendees_id, event_id, attendee_id, created_at, archived)
values
  ($1::uuid, $2::uuid, $3::uuid, now(), false)
returning *;