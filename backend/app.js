// starter tutorial: 
// https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas

'use strict'

const Mongo = require('mongodb');
const AWS = require('aws-sdk');
const moment = require('moment');
const fileType = require('file-type');
const sha1 = require('sha1');
const unixTime = require('unix-time');

const MongoClient = Mongo.MongoClient;
const ObjectID = Mongo.ObjectID;

let db_connection_uri = 'mongodb+srv://x-dogs-cats-hackathon:hackathon20!8@cluster0-hb7dg.mongodb.net/lapky?retryWrites=true';
let cachedDb = null;

exports.handler = (event, context, callback) => {

    const done = (err, res) => {
        console.log('DONE!');
        callback(null, {
            statusCode: err ? '400' : '200',
            body: err ? err.message : JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    };

    const body = (typeof event.body === 'string' ? JSON.parse(event.body) : event.body);
    //console.log("BODY", body);

    switch (event.queryStringParameters.action) {
        case 'lost-pet':
            processCrudAction({ verb: event.httpMethod, query: event.queryStringParameters, body, collection: 'lost_pets', done });
            break;
        case 'found-pet':
            processCrudAction({ verb: event.httpMethod, query: event.queryStringParameters, body, collection: 'found_pets', done });
            break;
        case 'sos-request':
            processCrudAction({ verb: event.httpMethod, query: event.queryStringParameters, body, collection: 'sos_requests', done });
            break;
        case 'bump-found-pet':
            break;
        case 'bump-sos-request':
            break;
        default:
            done(new Error(`invalid action: ${event.queryStringParameters.action}.`));
    }
};

function processCrudAction({ verb, query, body, collection, done }) {
    console.log(`processing verb ${verb} on collection ${collection}`);

    MongoClient.connect(db_connection_uri, { useNewUrlParser: true }, function (err, client) {
        const db = client.db('lapky');

        switch (verb) {
            case 'GET':
                db.collection(collection).find({}).toArray(function (err, result) {
                    client.close();
                    done(err, result);
                });
                break;
            case 'POST':
                body._id = new ObjectID();
                if (body.pictures) {
                    uploadPictures(body.pictures);
                }
                db.collection(collection).insertOne(body, function (err, result) {
                    client.close();
                    done(err, body._id);
                });
                break;
        }
    });
}

function uploadPictures(picturesArray, done) {
    const s3 = new AWS.S3();

    for (let i = 0 ; i < picturesArray.length ; i++) {
        const params = createFileParams(picturesArray[i]);
        picturesArray[i] = params.Key;
        
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log('S3 UPLOAD FAILED: ', err.message);
                done(err);
            } else {
                console.log('S3 UPLOAD SUCCEEDED!');
                done(null);
            }
        });
    }
}

function createFileParams(base64String) {
    const buffer = new Buffer(base64String, 'base64');
    const fileMime = fileType(buffer);
    const fileExt = fileMime.ext;
    const hash = sha1(new Buffer(new Date().toString()));
    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    const filePath = hash + '/';
    const fileName = unixTime(now) + '.' + fileExt;
    const fileFullName = filePath + fileName;
    
    console.log('PICTURE:', fileFullName);

    return {
        Bucket: 'x.dogs.cats.hackathon',
        Key: fileFullName,
        Body: buffer
    };
}
