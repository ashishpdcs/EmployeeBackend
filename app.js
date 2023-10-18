const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Auth = require('./MiddleWare/Auth'); 
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/employees', Auth.validate, employeeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
