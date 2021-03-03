const express = require('express');
const router = express.Router();

const usersHandler = require('./handler/users')
const verifyToken = require('../middlewares/verifyToken');

// 
router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login); 
router.put('/', verifyToken, usersHandler.update);
router.put('/updates/:id', verifyToken, usersHandler.updatesById);
router.get('/', verifyToken, usersHandler.getUser);
router.get('/select/:id', verifyToken, usersHandler.getUserById);
router.get('/all', verifyToken, usersHandler.getUsers);
router.post('/logout', verifyToken, usersHandler.logout);
router.delete('/:id', verifyToken, usersHandler.destroy);

module.exports = router;