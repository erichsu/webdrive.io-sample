var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
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
    .click('#check_out')
    .saveScreenshot('./checkout-step2.png')
    .end();