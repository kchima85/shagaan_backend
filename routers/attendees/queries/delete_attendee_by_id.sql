update
  attendees
set
  archived = true
where
  attendee_id = $1::uuid
returning *;