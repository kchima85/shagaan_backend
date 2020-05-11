select
  *
from
  attendees
where
  attendee_id = $1::uuid;