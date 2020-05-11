module.exports = {
  user_id: 'uuid PRIMARY KEY',
  google_id: 'varchar (255)',
  facebook_id: 'varchar (255)',
  first_name: 'varchar(40) NOT NULL',
  last_name: 'varchar(40) NOT NULL',
  email: 'varchar(40)',
  phone_number: 'varchar(40)',
  created_at: 'timestamp with time zone',
  archived: 'boolean',
};
