var fs = require('fs');
var archiver = require('archiver');
var { Time } = require('./getNow');
var { addLog, addSeriousFailLog } = require('./mongo');

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

            //fs.appendFileSync('logs.txt',
            //  "'" + domainName + "' domaininde '" + wantedFolder + "' dosyasi icindeki '" + zipName + "' arşivlendi ve " +
            // processMinute + ' dakika, ' + processSecond + " saniye surdu.\n");

            addLog(zipName, inputPath, startMoment, startMoment, endMoment.thisMoment);

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
            addSeriousFailLog(zipName, inputPath, startMoment, err);
        } else {
            addSeriousFailLog(zipName, inputPath, startMoment, err);
        }
        throw err;
    });


    archive.on('error', function (err) {
        addSeriousFailLog(zipName, inputPath, startMoment, err);
        throw err;
    });


    archive.pipe(output);

    if (fs.lstatSync(inputPath).isDirectory()) {
        archive.directory(inputPath, zipName);
    } else {
        archive.append(fs.createReadStream(inputPath), { name: zipName });
    }

    archive.finalize();

}


function dosya(domainName, wantedFolder, startMoment) {

    var dir = __dirname + '/zipler/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var dir2 = dir + startMoment + '/';
    if (!fs.existsSync(dir2)) {
        fs.mkdirSync(dir2);
    }

    var dir3 = dir2 + domainName + '/';
    if (!fs.existsSync(dir3)) {
        fs.mkdirSync(dir3);
    }

    var dir4 = dir3 + wantedFolder + '/';
    if (!fs.existsSync(dir4)) {
        fs.mkdirSync(dir4);
    }


}

module.exports = { archive };