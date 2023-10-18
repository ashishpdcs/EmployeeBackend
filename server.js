// const express = require('express');
// const { createPool } = require('mysql');
// const cors = require('cors');
// const jwt = require("jsonwebtoken");
// const secretKey = "secretKey";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'dcsdb',
//     connectionLimit: 10,
// });

// // Middleware to verify JWT token
// function verifyToken(req, res, next) {
//     const token = req.headers['authorization'];
  
//     console.log('Received Headers:', req.headers);  
//     console.log('Hit Received Token:', token);
  
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized - Token not provided' });
//     }
  
//     const actualToken = token.replace('Bearer ', '');
  
//     jwt.verify(actualToken, secretKey, (err, decoded) => {
//       if (err) {
//         console.error('Error verifying token:', err);
//         return res.status(401).json({ error: 'Unauthorized - Invalid token' });
//       }
  
//       console.log('Decoded Token:', decoded);
  
//       req.user = decoded.user;
//       next();
//     });
//   }
  


// // CREATE (Add Employee)
// app.post('/addemployee', verifyToken, (req, res) => {
//     const { FirstName, LastName, Email, Password, UserName } = req.body;
//     const authenticatedUserId = req.user.id;

//     const query = 'INSERT INTO employee (FirstName, LastName, Email, Password, UserName, CreatedBy) VALUES (?, ?, ?, ?, ?, ?)';
//     const values = [FirstName, LastName, Email, Password, UserName, authenticatedUserId];

//     pool.query(query, values, (err, results) => {
//         if (err) {
//             console.error('Error inserting record:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             console.log('1 Record Inserted');
//             return res.status(200).json({ message: 'Record Inserted' });
//         }
//     });
// });

// // READ (List All Employees)
// app.get('/getallemployees', verifyToken, (req, res) => {
//     const query = 'SELECT * FROM employee';
//     console.log('Hit List All Employee:' , verifyToken.status);
//     pool.query(query, (err, results) => {
//         if (err) {
//             console.error('Error retrieving records:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             console.log(`${results.length} Records Retrieved`);
//             return res.status(200).json({ employees: results });
//         }
//     });
// });

// // UPDATE (Update Employee)
// app.put('/updateemployee/:id', verifyToken, (req, res) => {
//     const employeeId = req.params.id;
//     const { FirstName, LastName, Email, Password, UserName } = req.body;
//     const authenticatedUserId = req.user.id;

//     const query = 'UPDATE employee SET FirstName=?, LastName=?, Email=?, Password=?, UserName=? WHERE id=? AND CreatedBy=?';
//     const values = [FirstName, LastName, Email, Password, UserName, employeeId, authenticatedUserId];

//     pool.query(query, values, (err, results) => {
//         if (err) {
//             console.error('Error updating record:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             if (results.affectedRows === 0) {
//                 return res.status(404).json({ error: 'Employee not found' });
//             } else {
//                 console.log('Record Updated');
//                 return res.status(200).json({ message: 'Record Updated' });
//             }
//         }
//     });
// });

// // DELETE (Delete Employee)
// app.delete('/deleteemployee/:id', verifyToken, (req, res) => {
//     const employeeId = req.params.id;
//     const authenticatedUserId = req.user.id;

//     const query = 'DELETE FROM employee WHERE id=? AND CreatedBy=?';
//     const values = [employeeId, authenticatedUserId];

//     pool.query(query, values, (err, results) => {
//         if (err) {
//             console.error('Error deleting record:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             if (results.affectedRows === 0) {
//                 return res.status(404).json({ error: 'Employee not found' });
//             } else {
//                 console.log('Record Deleted');
//                 return res.status(200).json({ message: 'Record Deleted' });
//             }
//         }
//     });
// });

// // SEARCH (Search Employee)
// app.get('/searchemployee', verifyToken, (req, res) => {
//     const { id } = req.query;

//     const query = 'SELECT * FROM employee WHERE id = ?';
//     const values = [id];

//     pool.query(query, values, (err, results) => {
//         if (err) {
//             console.error('Error searching for employee:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             if (results.length === 0) {
//                 return res.status(404).json({ error: 'Employee not found' });
//             } else {
//                 console.log(`${results.length} Records Found`);
//                 return res.status(200).json({ employees: results });
//             }
//         }
//     });
// });

// // LOGIN API
// app.post('/login', (req, res) => {
//     const { Email, Password } = req.body;

//     const query = 'SELECT * FROM employee WHERE Email = ? AND Password = ?';
//     const values = [Email, Password];

//     pool.query(query, values, (err, results) => {
//         if (err) {
//             console.error('Error querying database:', err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             if (results.length === 1) {
//                 const user = {
//                     id: results[0].id,
//                     UserName: results[0].UserName,
//                     email: results[0].Email,
//                 };

//                 jwt.sign({ user }, secretKey, { expiresIn: '2h' }, (jwtErr, token) => {
//                     if (jwtErr) {
//                         console.error('Error generating JWT:', jwtErr);
//                         return res.status(500).json({ error: 'Internal Server Error' });
//                     } else {
//                         console.log('User logged in:', results[0].UserName);
//                         return res.status(200).json({ token, message: 'Login successful' });
//                     }
//                 });
//             } else {
//                 console.log('Login failed');
//                 return res.status(401).json({ error: 'Invalid credentials' });
//             }
//         }
//     });
// });

// const port = 5000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
