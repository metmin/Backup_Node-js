const fs = require('fs');

const { archive } = require('./archive');

function actions(firstPath, domainName, wantedFolder, thisDay) {




    var secondPath = firstPath + domainName + '/wwwrot' + '/' + wantedFolder;

    console.log(secondPath + ' dosyasina girildi.');





    //logNames[i] = readFiles(secondPaths[i]);  

    var dirNames = fs.readdirSync(secondPath);

    //console.log(dirNames);



    var dirLength = dirNames.length;


    if (dirLength == 0) {

        try {

            fs.appendFileSync('logs.txt',
                domainName + "'de " + wantedFolder + ' dosyası boş. ARSIVLENECEK DOSYA YOK!\n');

            console.log(
                domainName + "'de " + wantedFolder + ' dosyası boş.\n');

        } catch (err) {
            console.log(err);
        }

    }

    else {

        for (j = 0; j < dirLength; j++) {

            archive(
                secondPath + '/' + dirNames[j],                                     // Arşivlenecek dosyanın bulunduğu konum
                __dirname + '/zipler' + '/' + domainName + '/' + wantedFolder + '/' + thisDay, // arşivin olacağı konum
                dirNames[j],                                                        //zip dosyasının ismi
                domainName,                                                         //ziplenecek dosyanın bulunduğu domain ismi
                wantedFolder,
                thisDay                                                        //ziplenecek dosyanın ismi
            );

        }

    }

}



module.exports = { actions };