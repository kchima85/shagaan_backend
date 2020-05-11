select
  user_id
from
  shagaan.users
where
  google_id = $1
or 
  facebook_id = $1;