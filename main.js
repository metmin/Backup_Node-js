const fs = require('fs');

const { actions } = require('./actions');

var { Time } = require('./getNow');

var { addFailLog, addSeriousFailLog } = require('./mongo');

var startMoment = new Time();




const firstPath = 'C:/entranet/';

var domainNames = fs.readdirSync(firstPath);

var domainNameslength = domainNames.length;



var wantedFolder = process.argv[2];




for (i = 0; i < domainNameslength; i++) {

    if (fs.existsSync(firstPath + domainNames[i] + '/wwwrot' + '/' + wantedFolder)) {

        var domainName = domainNames[i];

        actions(firstPath, domainName, wantedFolder, startMoment.thisMoment, startMoment.minute, startMoment.second);

    }
    else {
        console.log(domainNames[i] + "'de '" + wantedFolder + "' diye bir dosya yok!");

        try {

            addFailLog(wantedFolder, firstPath + '/' + domainNames[i], startMoment.thisMoment,
                '!!!!!! ' + domainNames[i] + "'de '" + wantedFolder + "' dosyasi yok! ARSIVLENECEK DOSYA YOK!!!!!!");

        } catch (err) {
            throw err;

        }

    }

}


