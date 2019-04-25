select
  *
from
  events
where
  event_id = $1::uuid
and
  created_by = $2::uuid;