update
  guestlists
set
  guest_list_name = $1::text,
  last_updated = now(),
  num_of_guests = $2::int
where
  guest_list_id = $3::uuid
and
  created_by = $4::uuid
returning *;