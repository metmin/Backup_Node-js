const fs = require('fs');

const { archive } = require('./archive');

var { Time } = require('./getNow');

var { addFailLog } = require('./mongo');

function actions(firstPath, domainName, wantedFolder, startMoment) {




    var secondPath = firstPath + domainName + '/wwwrot' + '/' + wantedFolder;

    console.log(secondPath + ' dosyasina girildi.');





    //logNames[i] = readFiles(secondPaths[i]);  

    var dirNames = fs.readdirSync(secondPath);

    //console.log(dirNames);



    var dirLength = dirNames.length;


    if (dirLength == 0) {

        try {

            // fs.appendFileSync('logs.txt',
            //   domainName + "'de " + wantedFolder + ' dosyası boş. ARSIVLENECEK DOSYA YOK!\n');

            addFailLog(wantedFolder, secondPath, startMoment, domainName + "'de " + wantedFolder + ' dosyası boş. ARSIVLENECEK DOSYA YOK!')

            console.log(
                domainName + "'de " + wantedFolder + ' dosyası boş.\n');

        } catch (err) {
            console.log(err);
        }

    }

    else {

        for (j = 0; j < dirLength; j++) {

            startZip = new Time();

            archive(
                secondPath + '/' + dirNames[j],                                     // Arşivlenecek dosyanın bulunduğu konum
                __dirname + '/zipler' + '/' + domainName + '/' + wantedFolder + '/' + startMoment, // arşivin olacağı konum
                dirNames[j],                                                        //zip dosyasının ismi
                domainName,                                                         //ziplenecek dosyanın bulunduğu domain ismi
                wantedFolder,                                                       //ziplenecek dosyanın ismi
                startMoment,
                startZip.minute,
                startZip.second
            );

        }

    }

}



module.exports = { actions };