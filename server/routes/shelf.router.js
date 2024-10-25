const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

let queryText = `SELECT * FROM "item" WHERE "user_id" = $1;`
const params = [req.user.id]; // Use the user ID


  //const params= [req.user.clearance_level];
  
    
    pool.query(queryText, params).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });

});


  
 


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const { description, image_url } = req.body;
  const queryText = `
    INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES($1, $2, $3);
  `;
  const params = [description, image_url, req.user.id];

  if (req.isAuthenticated()) {
    pool.query(queryText, params)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log("Error on /item POST:", err);
        res.sendStatus(500);
      });
  } else {
    console.log("Forbidden User");
    res.sendStatus(403);
  }
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
