const { createPool } = require('mysql');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dcsdb',
  connectionLimit: 10,
});

function createEmployee(data, callback) {
  console.log("Hi From employee Modal");
  const query = 'INSERT INTO employee (FirstName, LastName, Email, Password, UserName) VALUES (?, ?, ?, ?, ?)';
  const values = [data.FirstName, data.LastName, data.Email, data.Password, data.UserName];
  pool.query(query, values, callback);
}

function getAllEmployees(callback) {
  const query = 'SELECT * FROM employee';
  pool.query(query, callback);
}

function updateEmployee(employeeId, data, callback) {
  const query = 'UPDATE employee SET FirstName=?, LastName=?, Email=?, Password=?, UserName=? WHERE id=?';
  const values = [data.FirstName, data.LastName, data.Email, data.Password, data.UserName, employeeId];

  pool.query(query, values, callback);
}

function deleteEmployee(employeeId, callback) {
  const query = 'DELETE FROM employee WHERE id=?';
  const values = [employeeId];

  pool.query(query, values, callback);
}


function searchEmployeeById(employeeId, callback) {
  const query = 'SELECT * FROM employee WHERE id = ?';
  const values = [employeeId];

  pool.query(query, values, callback);
}


function login(email, password, callback) {
  const query = 'SELECT * FROM employee WHERE Email = ? AND Password = ?';
  const values = [email, password];

  pool.query(query, values, (err, results) => {
      console.log('Query Results:', results);

      if (err) {
          console.error('Error querying database:', err);
          return callback(err, null, null);
      }

      if (results.length === 1) {
          const user = {
              id: results[0].id,
              UserName: results[0].UserName,
              email: results[0].Email,
          };
          const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
          console.log("Token:", token);
          return callback(null, token, user);
      } else {
          return callback(null, null, null);
      }
  });
}


module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  searchEmployeeById,
  login,
};
