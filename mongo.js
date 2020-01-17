var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


function addLog(dirName, dirPath, tarih, start, finish) {

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("success-logs");
        var myobj = {
            dosyaIsmi: dirName, 
            Path: dirPath,
            baslangıc: start, 
            bitis: finish
        };
        dbo.collection(tarih).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

}

function addFailLog(dirName, dirPath, tarih, hataMesaj) {

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("failed-logs");
        var myobj = {
            dosyaIsmi: dirName, 
            Path: dirPath, 
            mesaj: hataMesaj
        };
        dbo.collection(tarih).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(hataMesaj);
            db.close();
        });
    });

}

function addSeriousFailLog(dirName, dirPath, tarih, hataMesaj) {

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SERIOUS-FAIL-LOGS");
        var myobj = {
            dosyaIsmi: dirName,
            Path: dirPath,
            mesaj: hataMesaj
        };
        dbo.collection(tarih).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

}

module.exports = { addLog, addFailLog, addSeriousFailLog };