const fs = require('fs');

var readlineSync = require('readline-sync');

const { actions } = require('./actions');




var date = new Date();

var month = date.getUTCMonth() + 1;

var thisDay = date.getUTCDate() + '-' + month.toString() + '-' + date.getFullYear() + '_' + date.getHours() + '-' + date.getMinutes();

try {
    fs.appendFileSync('logs.txt', '\n\n' + thisDay + '\n');
    console.log('Log kaydi basladi.');
} catch (err) {
    console.log(err);
}





const firstPath = 'C:/entranet/';

var domainNames = fs.readdirSync(firstPath);

var domainNameslength = domainNames.length;




////////////KONSOLA wwwrot dosyasının içinde ziplemek istediğin dosyayı yaz ////////////////
////////Burada fonksiyonun içindeki yazı konsolda bize soru olarak geliyor./////////////////

var wantedFolder = readlineSync.question('Ziplemek istedigin dosya ismini gir:');

///////////////////////////////////////////////////////////////////////////////////////////

for (i = 0; i < domainNameslength; i++) {

    if (fs.existsSync(firstPath + domainNames[i] + '/wwwrot' + '/' + wantedFolder)) {

        var domainName = domainNames[i];

        actions(firstPath, domainName, wantedFolder, thisDay);

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









