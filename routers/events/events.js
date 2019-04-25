const express = require('express');
const pool = require('../../tools/pgConnect');
const fileReader = require('../../tools/fileReader')('./routers/events/queries/');
const uuid = require('uuid');

const router = express.Router();

// create event route
router.post('/', async (req, res, next) => {
  const parsedAddress = parseAddress(req.body.address);
  try {
    const result = await pool.query(fileReader.create_event, [
      req.user,
      req.body.name_of_event,
      parseDate(req.body.start_time)[0],
      parsedAddress[2],
      parsedAddress[1],
      parsedAddress[0],
      `${parseDate(req.body.start_time)[1]}${parseDate(req.body.start_time)[2]}`,
      `${parseDate(req.body.end_time)[1]}${parseDate(req.body.end_time)[2]}`,
      uuid(),
    ]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.create_event);
    next(err);
  }
});

// get all events
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_all_events, [req.user]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_all_events);
    next(err);
  }
});

// get event back by id
router.get('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.get_event_by_id, [req.params.id, req.query.user_id]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.get_event_by_id);
    next(err);
  }
});

// update event by id
router.put('/:id', async (req, res, next) => {
  const parsedAddress = parseAddress(req.body.address);
  try {
    const result = await pool.query(fileReader.update_event_by_id, [
      req.body.name_of_event,
      req.user,
      parseDate(req.body.start_time)[0],
      req.body.parsedAddress[0],
      `${parseDate(req.body.start_time)[1]}${parseDate(req.body.start_time)[2]}`,
      `${parseDate(req.body.end_time)[1]}${parseDate(req.body.end_time)[2]}`,
      req.body.parsedAddress[2],
      req.body.parsedAddress[1],
      req.params.id,
      req.query.user_id]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.update_event_by_id);
    next(err);
  }
});

// archive event by id
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(fileReader.delete_event_by_id, [
      req.params.id,
      req.query.user_id]);
    res.send(result.rows);
  } catch (err) {
    console.error(fileReader.delete_event_by_id);
    next(err);
  }
});

function parseAddress(address) {
  const parsedAddress = address.split(', ');
  return parsedAddress;
}

function parseDate(time) {
  return time.split(' ');
}

module.exports = router;
