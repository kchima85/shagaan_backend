select
  *
from
  guestlists
where
  created_by = $1::uuid;