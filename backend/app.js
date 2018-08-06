// starter tutorial: 
// https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas

'use strict'

var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var ObjectID = Mongo.ObjectID;

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

    switch (event.queryStringParameters.action) {
        case 'lost-pet':
            processCrudAction({ verb: event.httpMethod, query: event.queryStringParameters, body: event.body, collection: 'lost_pets', done });
            break;
        case 'found-pet':
            processCrudAction({ verb: event.httpMethod, query: event.queryStringParameters, body: event.body, collection: 'found_pets', done });
            break;
        case 'sos-request':
            processCrudAction({ verb: event.httpMethod, query: event.queryStringParameters, body: event.body, collection: 'sos_requests', done });
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

function uploadPictures(picturesArray) {
    for (let i = 0 ; i < picturesArray.length ; i++) {
        
    }
}