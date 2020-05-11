select
  g.event_id, ga.guest_list_id, g.guest_list_name, ga.attendee_id, ga.created_at, ga.rsvp_status,
  ga.rsvp_time_stamp, ga.plus_ones, ga.amount_given, ga.guestlists_attendee_id
from
  guestlists g
join
  guestlists_attendees ga
on
  g.guest_list_id = ga.guest_list_id
where
  ga.guestlists_attendee_id = $1::uuid
and
  g.created_by = $2::uuid;