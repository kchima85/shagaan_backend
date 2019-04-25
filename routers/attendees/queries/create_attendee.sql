insert into attendees
    (attendee_id, first_name, last_name, email, phone_number, archived, created_at)
values
    ($1::uuid, $2::text, $3::text, $4::text, $5::text, false, now())
returning *;