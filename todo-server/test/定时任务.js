const schedule = require('node-schedule');

function scheduleCronstyle() {
    schedule.scheduleJob('30 * * * * *', function () {
        console.log('scheduleCronstyle:' + new Date());
    });
}

scheduleCronstyle();