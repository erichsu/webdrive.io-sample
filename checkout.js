var schedule = require('node-schedule');
var IncomingWebhook = require('@slack/client').IncomingWebhook;
var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var url = process.env.SLACK_WEBHOOK_URL || 'https://hooks.slack.com/services/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'; //see section above on sensitive data

var webhook = new IncomingWebhook(url);


var task = function() {
    console.log('Starting...');
    webdriverio
        .remote(options)
        .init()
        .url('http://tpehrweb.tutorabc.com/TIMG_inout/form/index.html')
        .getTitle().then(function(title) {
            console.log('Title was: ' + title);
            //this.waitForSelector('input[name="employeeid"]');
        })
        .setValue('input[name="employeeid"]', '104012101421')
        .click('#btn_cardNumber')
        .saveScreenshot('./checkout-step1.png')
        // .click('#check_in')
        .click('#check_out')
        .saveScreenshot('./checkout-step2.png')
        .end();
    webhook.send('Hello there out', function(err, res) {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log('Message sent: ', res);
        }
    });
}

var genTask = function() {

    var nextDate = new Date();
    var begin = 30;
    var end = 59;
    // var second = Math.floor((Math.random() * Math.abs(end - begin) + 1) + begin);
    // nextDate.setSeconds(second);
    var minute = Math.floor((Math.random() * Math.abs(end - begin) + 1) + begin);
    nextDate.setMinutes(minute);
    console.log('Job will start in...', nextDate);
    schedule.scheduleJob(nextDate, task);

};
var j = schedule.scheduleJob('0 19 * * *', genTask);