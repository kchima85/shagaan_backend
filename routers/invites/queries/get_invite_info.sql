with event_info as (
  select
    e.name_of_event, e.created_by
  from
    events e
  where
    e.event_id = $1::uuid
  and
    e.created_by = $2::uuid
)
select
  u.first_name as user_first_name, u.last_name as user_last_name,
  u.phone_number as user_phone_number, ei.*
from
  users u
join
  event_info ei
on
  u.user_id = ei.created_by;