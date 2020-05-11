module.exports = {
  attendee_id: 'uuid PRIMARY KEY',
  first_name: 'varchar(40) NOT NULL',
  last_name: 'varchar(40) NOT NULL',
  email: 'varchar(40) NOT NULL',
  phone_number: 'varchar(40) NOT NULL',
  created_at: 'timestamp with time zone',
  archived: 'boolean',
};
