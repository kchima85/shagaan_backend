update
  users
set
  archived = true
where
  user_id = $1::uuid
returning *;