// to work with this install json-server globally
// and export NODE_PATH as global variable
// e.g. $ export NODE_PATH=/path/to/your/npm/lib/node_modules

// general middleware.js
const jsonServer = require('json-server');

module.exports = (req, res, next) => {

  const router = jsonServer.router('db.json');
  const db = router.db;

  if (req.method === 'POST') {

    if (req.path === '/auth/login') {
      const result = db.get('users')
        .find({username: req.body.username, password: req.body.password})
        .value();

      const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJiMGYyMzg4ZWZkMGJhNjk4YmRhMWJhM2Q4OWY5NTI3NGFhZmM5N2JiZWIxNGRiYWNmNWU1YmJmMGEyZmZjNjkwYWIwN2ExYTAyZDg3NzI5In0.eyJhdWQiOiI1IiwianRpIjoiMmIwZjIzODhlZmQwYmE2OThiZGExYmEzZDg5Zjk1Mjc0YWFmYzk3YmJlYjE0ZGJhY2Y1ZTViYmYwYTJmZmM2OTBhYjA3YTFhMDJkODc3MjkiLCJpYXQiOjE1MzgwMzc3NTMsIm5iZiI6MTUzODAzNzc1MywiZXhwIjoxNTY5NTczNzUzLCJzdWIiOiIxNiIsInNjb3BlcyI6W119.EPQKHB-QggqFaEZp-75KloYFlPPs_EehhCD3qkvGf0rYvlmai3NctkQLf5rbUyK8WgQXnZcDCvvuSnLY3F_GfbNWUzx5cHB8sgC9tpsahmsyygwtt5EUjoQO2AM6h3xABi_EUhfV1nOZeKQDutNM2Tx7aoISg_dv4Nxfl8VbWrjlVQWgLO-7xoISnUyuC1ucJV8Kg9DmLoKeLbgTJK9NEykA9V94gopN-VABQNAntc4iAr0anFWIKC5n-Xkrw0BGiLSzBz7A04Z5S82CvmgpiKgk38_lgY9JT8SDQAVchphyMoz7B3atG-D3ozOx4-l7Gmn8Sor8gfJxAs0GvixyjzQQoeCz1WM9FsvrbNKY_ooAtH6Li0E2U7f1oERPQHOo-j9v7n30c0XY78rOsiOMnR_7ehp4Yr-vGDf_nimdL2Xe2OZ82-ixLyl9zn5QnWHiPJ1B6S-0xDy6KQwk4ct3HnB60tPU65zSGNLVB-Q0iOxV73HoUe3nk7k_-OQOZQYwQKgKQv6VNHSs3MHYFgthaGWT4Ta-l4StiFF-6R3xunbpRgtGxleE-ZvNOR-a41FP3nDrknYsoGwoJ7Q8uIkzJ4qW0aPPgg6JlaLbKiwZpnw1Vew7gYuncWe9T6PUULQSs2M8KZQx18MYq7vCzu-MQlkVOa0Pt628FZUG3lrsiLw';

      if (result) {
        res.status(200).json({
          user: result,
          access_token: jwt
        });
      } else {
        res.status(404).json({message: 'ERRORS.INVALID_CREDENTIALS'});
      }

    } else if (req.path === '/patients' && req.body.lastname.toLowerCase() === 'error') {
      res.status(500).json({
        message: 'INTERNAL_SERVER_ERROR'
      })
    } else {
      next();
    }


  } else if (req.method === 'GET') {

    if (req.path === '/devices/admincode') { //check for availability of a device

      const result = db.get('devices')
        .find({admin_code: req.query.code})
        .value();

      if (result) {
        if (!result.patients_id) {
          res.status(200).json(result)
        } else {
          res.status(406).json({
            message: 'ERRORS.DEVICE_NOT_AVAILABLE'
          })
        }
      } else {
        res.status(404).json({
          message: 'ERRORS.UNKNOWN_DEVICE'
        })
      }
    } else if (req.path === '/auth/logout') {

      res.status(200).json({
        message: 'SUCCESSFUL_LOGOUT'
      });

    } else {
      next();
    }
  }
};
