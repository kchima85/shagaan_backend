select
  *
from
  guestlists
where
  event_id = $1::uuid
and
  created_by = $2::uuid;