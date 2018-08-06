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
    let promise = null;

    switch (event.queryStringParameters.action) {
        case 'lost-pet':
            promise = processCrudActionAsync({ verb: event.httpMethod, query: event.queryStringParameters, body, collectionName: 'lost_pets' });
            break;
        case 'found-pet':
            promise = processCrudActionAsync({ verb: event.httpMethod, query: event.queryStringParameters, body, collectionName: 'found_pets' });
            break;
        case 'sos-request':
            promise = processCrudActionAsync({ verb: event.httpMethod, query: event.queryStringParameters, body, collectionName: 'sos_requests' });
            break;
        case 'bump-found-pet':
            break;
        case 'bump-sos-request':
            break;
        default:
            done(new Error(`invalid action: ${event.queryStringParameters.action}.`));
    }

    if (promise) {
        promise.then(
            res => done(null, res), 
            err => done(err)
        );
    }
};

async function processCrudActionAsync({ verb, query, body, collectionName }) {
    console.log(`processing verb ${verb} on collection ${collectionName}`);

    const client = await MongoClient.connect(db_connection_uri, { useNewUrlParser: true });
    const db = client.db('lapky');

    let result = null;

    try {
        switch (verb) {
            case 'GET':
                result = await db.collection(collectionName).find({}).toArray();
                break;
            case 'POST':
                body._id = new ObjectID();
                if (body.pictures) {
                    await uploadPicturesAsync(body.pictures);
                }
                await db.collection(collectionName).insertOne(body);
                result = body._id;
                break;
        }
    } finally {
        client.close();
    }

    return result;
}

async function uploadPicturesAsync(picturesArray, done) {
    const s3 = new AWS.S3();

    for (let i = 0; i < picturesArray.length; i++) {
        const params = createFileParams(picturesArray[i]);
        picturesArray[i] = params.Key;

        try {
            await s3.putObject(params).promise();
            console.log('S3 UPLOAD SUCCEEDED!');
        } catch (err) {
            console.log('S3 UPLOAD FAILED: ', err.message);
        }
    }
}

function connectToDbAsync() {

    // Connection URL. This is where your mongodb server is running.
    let url = constants.MONGODB_URI;
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the Server
        mongoClient.connect(url, (err, db) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
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
