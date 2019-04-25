insert into users
    (first_name, last_name, email, user_id, google_id, created_at, archived)
values
    ($1::text, $2::text, $3::text, $4::uuid, $5::text, now(), false)
returning *;