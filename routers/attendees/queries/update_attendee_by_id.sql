update
  attendees
set
  first_name = $1::text,
  last_name = $2::text,
  email = $3::text,
  phone_number = $4::text
where
  attendee_id = $5::uuid
returning *;