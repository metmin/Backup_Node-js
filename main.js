const fs = require('fs');

const { actions } = require('./actions');

var { Time } = require('./getNow');



var startMoment = new Time();

try {
    fs.appendFileSync('logs.txt', '\n\n' + startMoment.thisMoment + '\n');
    console.log('Log kaydi basladi. ' + startMoment.thisMoment);
} catch (err) {
    console.log(err);
}



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

            fs.appendFileSync('logs.txt', '!!!!!! ' + domainNames[i] + "'de '" + wantedFolder + "' dosyasi yok! ARSIVLENECEK DOSYA YOK!!!!!!\n");

        } catch (err) {
            /* Handle the error */
        }

    }

}



/*

var secondPaths = new Array;

for (i = 0; i < domainNameslength; i++) {

    secondPaths[i] = firstPath + domainNames[i] + '/wwwrot' + '/' + wantedFolder;

    console.log(secondPaths[i]);

}




var dirNames = new Array();

for (i = 0; i < domainNameslength; i++) {

    //logNames[i] = readFiles(secondPaths[i]);

    dirNames[i] = fs.readdirSync(secondPaths[i]);

    console.log(dirNames[i]);

}





for (i = 0; i < secondPaths.length; i++) {


    for (j = 0; j < dirNames[i].length; j++) {

        archive(
            secondPaths[i],
            './zipler' + '/' + domainNames[i] + '/' + wantedFolder,
            dirNames[i][j]
        );

    }

}

*/









