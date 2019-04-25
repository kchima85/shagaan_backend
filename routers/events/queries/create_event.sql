insert into events
  (created_by, name_of_event, date, state, city,
  address, start_time, end_time, created_at,
  event_id, last_updated, archived, completed)
values
  ($1::uuid, $2::text, $3::date, $4::text,
  $5::text, $6::text, $7::time, $8::time,
  current_timestamp, $9::uuid, current_timestamp, false, false)
returning *;