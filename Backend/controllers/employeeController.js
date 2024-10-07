const Employee = require('../models/Employee');


exports.createEmployee = async (req, res) => {
    try {
        const employeeData = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            designation: req.body.designation,
            gender: req.body.gender,
            course: req.body.course, // Assuming course is sent as a JSON string
            imgUpload: req.file ? req.file.path : '', // Save the file path
        };
        console.log(employeeData)

        const newEmployee = new Employee(employeeData);
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create employee', error });
    }
};




exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getEmployeeById = async (req, res) => {
    console.log('Request received:', req.params.id); // Check if this logs
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


  
  // Update employee
 // employeeController.js
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated employee
            runValidators: true, // Run schema validations
        });
        console.log(employee)

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
       await employee.save()

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// employeeController.js
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

