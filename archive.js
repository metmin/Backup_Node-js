const folderZipper = require('folder-zipper');

const fs = require('fs')

function archive(inputpath, zipPath, zipName, domainName, wantedFolder) {

    folderZipper(inputpath, zipPath + '/' + zipName + '.zip')
        .then(result => {

            console.log("'" + domainName + "' domaininde '" + wantedFolder + "' dosyasi icindeki '" + zipName + "'" + ' arsivlendi.');

            // console.log(result);

            try {

                fs.appendFileSync('logs.txt',
                    "'" + domainName + "' domaininde '" + wantedFolder + "' dosyasi icindeki '" + zipName + "' arşivlendi.\n");

            } catch (err) {
                console.log(err);
            }

        })
        .catch(error => {
            console.log(error);

            try {

                fs.appendFileSync('logs.txt', "'" + zipName + "'" + ' arşivlenemedi!!!!\n' + error + '\n');

            } catch (err) {
                console.log(err);
            }


        });

}

module.exports = { archive };