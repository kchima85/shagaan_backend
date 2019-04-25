select
  *
from
  events
where
  created_by = $1::uuid
and
  archived = false;