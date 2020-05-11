with attendee_info as (
  select
    ga.guestlists_attendee_id, ga.guest_list_id, ga.attendee_id
  from
    attendees a
  join
    guestlists_attendees ga
  on
    ga.attendee_id = a.attendee_id
  where
    a.phone_number = $1::text
)
select 
  e.event_id, e.name_of_event, g.guest_list_id, ai.guestlists_attendee_id,
  ai.attendee_id
from
  events e
join
  guestlists g
on
  e.event_id = g.event_id
join
  attendee_info ai
on
  g.guest_list_id = ai.guest_list_id
where
  e.completed != true;