module.exports = {
  guest_list_id: 'uuid PRIMARY KEY',
  event_id: 'uuid',
  guest_list_name: 'varchar(40) NOT NULL',
  created_by: 'uuid',
  created_at: 'timestamp with time zone',
  last_updated: 'timestamp with time zone',
  num_of_guests: 'integer NOT NULL',
  archived: 'boolean',
};
