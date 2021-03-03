var express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	cors = require('cors'),
	path = require('path');

var departmentCtrl = require('./apiControllers/departmentController'),
	jobroleCtrl = require('./apiControllers/jobroleController'),
	employeeCtrl = require('./apiControllers/employeeController'),
	payrollCtrl = require('./apiControllers/payrollController'),
	userCtrl = require('./apiControllers/userController');

var verifyAccessToken = require('./repos/authRepo').verifyAccessToken;

var app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

var staticDir = express.static(
    path.resolve(__dirname, 'public')
);
app.use(staticDir);

// app.get('/', (req, res) => {
// 	var ret = {
// 		msg: 'hello from nodejs api'
// 	};
// 	res.json(ret);
// });

app.use('/api/v1/departments', departmentCtrl);
app.use('/api/v1/jobroles', jobroleCtrl);
app.use('/api/v1/employees', employeeCtrl);
app.use('/api/v1/users', userCtrl);
app.use('/api/v1/payrolls', verifyAccessToken, payrollCtrl);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`API running on port ${port}`);
});