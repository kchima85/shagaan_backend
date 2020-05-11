select
  a.first_name, a.phone_number as attendee_phone_number
from
  attendees a
where
  a.attendee_id::uuid = $1::uuid;