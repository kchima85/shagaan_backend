update
  guestlists
set
  archived = true
where
  guest_list_id = $1::uuid
and
  created_by = $2::uuid
returning *;