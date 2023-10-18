const employeeModel = require('../models/employeeModel');
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';

function createEmployee(req, res) {
    employeeModel.createEmployee(req.body, (err, results) => {
        if (err) {
            console.error('Error inserting record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('1 Record Inserted');
            return res.status(200).json({ message: 'Record Inserted' });
        }
    });
}

function getAllEmployees(req, res) {
    employeeModel.getAllEmployees((err, results) => {
        if (err) {
            console.error('Error retrieving records:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(`${results.length} Records Retrieved`);
            return res.status(200).json({ employees: results });
        }
    });
}

function updateEmployee(req, res) {
    const employeeId = req.params.id;
    const data = req.body;
    employeeModel.updateEmployee(employeeId, data, (err, results) => {
        if (err) {
            console.error('Error updating record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Employee not found' });
            } else {
                console.log('Record Updated');
                return res.status(200).json({ message: 'Record Updated' });
            }
        }
    });
}

function deleteEmployee(req, res) {
    const employeeId = req.params.id;

    if (!employeeId) {
        return res.status(400).json({ error: 'Invalid employeeId' });
    }

    employeeModel.deleteEmployee(employeeId, (err, results) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Record Deleted');
            return res.status(200).json({ message: 'Record Deleted' });
        }
    });
}

function searchEmployee(req, res) {
    const employeeId = req.query.id;

    employeeModel.searchEmployeeById(employeeId, (err, results) => {
        if (err) {
            console.error('Error searching for employee:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ error: 'Employee not found' });
            } else {
                console.log(`${results.length} Records Found`);
                return res.status(200).json({ employees: results });
            }
        }
    });
}

function login(req, res) {
    console.log("From login Controller")
    const { Email, Password } = req.body;
    employeeModel.login(Email, Password, (err, token, user) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (token) {
            const refreshToken = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '7d' });
            return res.status(200).json({ token, refreshToken, message: 'Login successful' });
        } else {
            console.log('Login failed');
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
}

module.exports = {
    createEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    searchEmployee,
    login,
};
