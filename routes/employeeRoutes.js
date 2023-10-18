const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const Auth = require('../MiddleWare/Auth');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

router.post('/createEmployee', Auth.validate, employeeController.createEmployee);
router.get('/getallemployees', Auth.validate, employeeController.getAllEmployees);
router.put('/updateemployee/:id', Auth.validate, employeeController.updateEmployee);
router.delete('/deleteemployee/:id', Auth.validate, employeeController.deleteEmployee);
router.get('/searchemployee', Auth.validate, employeeController.searchEmployee);
router.post('/login', employeeController.login);

// router.post('/login',(req, res) => {
//     console.log("/login,()req, res" )
//     const user = req.user;
//     const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
//     const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: '10m' });
//     res.json({ token, refreshToken });
// }, employeeController.login);

router.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token missing' });
    }

    try {
        const decoded = jwt.verify(refreshToken, secretKey);
        const userId = decoded.user.id;
        const role = decoded.user.role;

        const newAccessToken = jwt.sign({ userId, role }, secretKey, { expiresIn: '15m' });

        res.json({ accessToken: newAccessToken, message: 'Token refreshed successfully' });
    } catch (error) {
        console.error('Error decoding refresh token:', error);
        return res.status(403).json({ error: 'Invalid refresh token' });
    }
});

module.exports = router;
