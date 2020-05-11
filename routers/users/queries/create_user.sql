insert into users
    (first_name, last_name, email, phone_number, user_id, created_at, archived)
values
    ($1::text, $2::text, $3::text, $4::text, $5::uuid, now(), false)
returning *;