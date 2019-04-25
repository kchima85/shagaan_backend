select
  created_by
from
  events
where
  created_by = $1;