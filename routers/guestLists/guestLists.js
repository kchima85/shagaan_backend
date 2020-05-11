const express = require('express');
const pool = require('../../tools/pgConnect');
const fileReader = require('../../tools/fileReader')('./routers/guestLists/queries/');
const uuid = require('uuid');

const router = express.Router();

// create guestlists
router.post('/', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.create_guest_list, [
      req.body.event_id,
      req.body.created_by,
      req.body.guest_list_name,
      uuid(),
      req.body.num_of_guests,
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.create_guest_list);
    next(err);
  }
});

// get all guestlists
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_all_guest_lists, [req.query.user_id]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_all_guest_lists);
    next(err);
  }
});

// get guestlists by event_id
router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_guest_lists_by_id, [req.params.id,
      req.user]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_guest_lists_by_id);
    next(err);
  }
});

// update guestlists by id
router.put('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.update_guest_list_by_id, [
      req.body.guest_list_name,
      req.body.num_of_guests,
      req.params.id,
      req.query.user_id,
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.update_guest_list_by_id);
    next(err);
  }
});

// archive guestlists by id
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.delete_guest_list_by_id, [req.params.id, 
      req.query.user_id]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.update_guest_list_by_id);
    next(err);
  }
});

module.exports = router;
