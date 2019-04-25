insert into guestLists
  (event_id, created_by, guest_list_name, guest_list_id,
  created_at, num_of_guests, archived, last_updated)
values
  ($1::uuid, $2::uuid, $3::text, $4::uuid, now(), $5::int, false, now())
returning *;