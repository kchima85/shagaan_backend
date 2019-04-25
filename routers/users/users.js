const express = require('express');
const pool = require('../../tools/pgConnect');
const fileReader = require('../../tools/fileReader')('./routers/users/queries/');
const uuid = require('uuid');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_all_users);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_all_users);
    next(err);
  }
});

router.get('/current_user', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_user_by_id, [req.user]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_user_by_id);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_user_by_id, [req.params.id]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_user_by_id);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.create_user, [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.phone_number,
      uuid()
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.create_user);
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const phone_number = req.body.phone_number.replace(/-+/g, '');
  try {
    const result = await pool.query(fileReader.update_user, [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      phone_number,
      req.user,
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.update_user);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.delete_user, [req.params.id]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.delete_user);
    next(err);
  }
});

module.exports = router;
