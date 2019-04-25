update
  events
set
  name_of_event = $1::text,
  created_by = $2::uuid,
  date = $3::date,
  address = $4::text,
  start_time = $5::time,
  end_time = $6::time,
  state = $7::text,
  city = $8::text,
where
  event_id = $9::uuid
and
  created_by = $10::uuid
returning *;