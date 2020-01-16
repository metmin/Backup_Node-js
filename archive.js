var fs = require('fs');
var archiver = require('archiver');
var { Time } = require('./getNow');

function archive(inputPath, zipPath, zipName, domainName, wantedFolder, startMoment, startMinute, startSecond) {

    dosya(domainName, wantedFolder, startMoment);

    var output = fs.createWriteStream(zipPath + '/' + zipName + '.zip');
    var archive = archiver('zip', {
        zlib: { level: 1 } // Sets the compression level.
    });


    output.on('close', function () {


        try {

            endMoment = new Time();

            var processMinute = endMoment.minute - startMinute;
            var processSecond = endMoment.second - startSecond;

            if (processSecond < 0) {
                processSecond = processSecond + 60;
                processMinute = processMinute - 1;

            }

            fs.appendFileSync('logs.txt',
                "'" + domainName + "' domaininde '" + wantedFolder + "' dosyasi icindeki '" + zipName + "' arşivlendi ve " +
                processMinute + ' dakika, ' + processSecond + " saniye surdu.\n");


            console.log("'" + domainName + "' domaininde '" + wantedFolder + "' dosyasi icindeki '" + zipName + "'" + "' arşivlendi ve " +
                processMinute + ' dakika, ' + processSecond + " saniye surdu.");

        } catch (err) {
            console.log(err);
        }

    });

    output.on('end', function () {
        console.log('Data has been drained');
    });


    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });


    archive.on('error', function (err) {
        throw err;
    });


    archive.pipe(output);


    archive.directory(inputPath, true);


    archive.finalize();

}


function dosya(domainName, wantedFolder, startMoment) {

    var dir = __dirname + '/zipler/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var dir2 = dir + domainName + '/';
    if (!fs.existsSync(dir2)) {
        fs.mkdirSync(dir2);
    }

    var dir3 = dir2 + wantedFolder + '/';
    if (!fs.existsSync(dir3)) {
        fs.mkdirSync(dir3);
    }

    var dir4 = dir3 + startMoment + '/';
    if (!fs.existsSync(dir4)) {
        fs.mkdirSync(dir4);
    }



}

module.exports = { archive };