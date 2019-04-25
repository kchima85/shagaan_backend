const express = require('express');
const uuid = require('uuid');
const pool = require('../../tools/pgConnect');
const fileReader = require('../../tools/fileReader')('./routers/attendees/queries/');

const router = express.Router();

// create attendee
router.post('/', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.create_attendee, [
      uuid(),
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone_number,
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.create_attendee);
    next(err);
  }
});

// get all attendees back
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_all_attendees);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_all_attendees);
    next(err);
  }
});

// get attendee back by attendee id
router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_attendee_by_id, [req.params.id]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.guest_list_id);
    next(err);
  }
});

// update attendee by attendee id
router.put('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.update_attendee_by_id, [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone_number,
      req.body.attendee_id,
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.update_attendee_by_id);
    next(err);
  }
});

// archives attendee by id
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.delete_attendee_by_id, [req.params.id]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.delete_attendee_by_id);
    next(err);
  }
});

module.exports = router;
