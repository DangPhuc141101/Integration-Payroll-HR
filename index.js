if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const app = express();

const payrollController = require('./controllers/payroll');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// const Redis = require("ioredis");
const redis = require("redis");

const employeeRouter = require('./routers/employees');
const payRateRouter = require('./routers/payRate');
const jobHistoryRouter = require('./routers/jobHistory');
const benefitPlanRouter = require('./routers/benefitPlan');
const connectMongo = require('./config/connectMongo');
connectMongo();

(async () => {
    const client = redis.createClient({
        host: 'localhost',
        port: '6379',
        password: ''
    });

    const subscriber = client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe('upgrade', (message) => {
        io.emit('upgrade', 'reload01')
        console.log(message); // 'message'
    });
})();

io.on('connection', function (client) {
    console.log('Client connected...');

});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({ secret: 'this is my secret' }));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/employees', employeeRouter);
app.use('/payrates', payRateRouter);
app.use('/job-history', jobHistoryRouter);
app.use('/benefit-plan', benefitPlanRouter);
app.get('/', payrollController.amount)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('SERVER LISTEN ON PORT ', PORT);
})



