var fs = require('fs');
var archiver = require('archiver');

function archive(inputPath, zipPath, zipName, domainName, wantedFolder, thisDay) {

    dosya(domainName, wantedFolder, thisDay);

    var output = fs.createWriteStream(zipPath + '/' + zipName + '.zip');
    var archive = archiver('zip', {
        zlib: { level: 1 } // Sets the compression level.
    });


    output.on('close', function () {
        console.log("'" + domainName + "' domaininde '" + wantedFolder + "' dosyasi icindeki '" + zipName + "'" + ' arsivlendi.');

        try {

            fs.appendFileSync('logs.txt',
                "'" + domainName + "' domaininde '" + wantedFolder + "' dosyasi icindeki '" + zipName + "' arşivlendi.\n");

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


function dosya(domainName, wantedFolder, thisDay) {

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

    var dir4 = dir3 + thisDay + '/';
    if (!fs.existsSync(dir4)) {
        fs.mkdirSync(dir4);
    }



}

module.exports = { archive };