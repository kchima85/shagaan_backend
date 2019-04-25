select
  user_id
from
  users
where
  google_id = $1
or 
  facebook_id = $1;