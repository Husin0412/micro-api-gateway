const express = require('express');
const router = express.Router();

const coursesHandler = require('./handler/courses');
const verifyToken = require('../middlewares/verifyToken');
const can = require('../middlewares/permission');
// 
router.get('/', coursesHandler.getAll);
router.get('/:id', coursesHandler.get);
router.get('/all', coursesHandler.getAlls);
router.post('/', verifyToken, can('supersu', 'admin'), coursesHandler.create);
router.put('/:id', verifyToken, can('supersu', 'admin'), coursesHandler.update);
router.delete('/:id', verifyToken, can('supersu', 'admin'), coursesHandler.destroy);
router.post('/search', verifyToken, can('supersu', 'admin'), coursesHandler.search);

module.exports = router;