const express = require('express');
const { createEmployee, getEmployees, updateEmployee, getEmployeeById, deleteEmployee } = require('../controllers/employeeController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/create', protect, upload.single('imgUpload'), createEmployee);
router.get('/', protect, getEmployees);
router.get('/:id', protect, getEmployeeById);
router.put('/:id', protect, updateEmployee); // Added protect middleware
router.delete('/:id', protect, deleteEmployee); // Added protect middleware

module.exports = router;
