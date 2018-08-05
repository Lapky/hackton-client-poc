// starter tutorial: 
// https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas

'use strict'

var MongoClient = require('mongodb').MongoClient;

let db_connection_uri = 'mongodb+srv://x-dogs-cats-hackathon:hackathon20!8@cluster0-hb7dg.mongodb.net/lapky?retryWrites=true';
let cachedDb = null;

exports.handler = (event, context, callback) => {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let eventBody = parseEventBody(event);

    switch (event.queryStringParameters.action) {
        case 'lost-pet':
            processCrudAction({ verb: event.httpMethod, query: event.queryStringParameters, body: eventBody, collection: 'lost_pets', done });
            break;
        case 'found-pet':
            processCrudAction({ verb: event.httpMethod, query: event.queryStringParameters, body: eventBody, collection: 'found_pets', done });
            break;
        case 'sos-request':
            processCrudAction({ verb: event.httpMethod, query: event.queryStringParameters, body: eventBody, collection: 'sos_requests', done });
            break;
        case 'bump-found-pet':
            break;
        case 'bump-sos-request':
            break;
        default:
            done(new Error(`invalid action: ${event.queryStringParameters.action}.`));
    }
};

function parseEventBody(event) {
    if (event.body) {
        return JSON.parse(event.body)
    }
    return null;
}

function processCrudAction({ verb, query, body, collection, done }) {
    console.log(`processing verb ${verb} on collection ${collection}`);

    MongoClient.connect(db_connection_uri, function (err, client) {
        const db = client.db('lapky');

        switch (verb) {
            case 'GET':
                done(null, []); //TODO
                break;
            case 'POST':
                db.collection(collection).insertOne(body, function(err, result) {

                    //TODO: body.id = ObjectID.generate();
                    body.id = 'abcdef12345';

                    if(err!=null) {
                        console.error("an error occurred in createDoc", err);
                        done(null, JSON.stringify(err));
                    }
                    else {
                        console.log("Kudos! You just created an entry into the restaurants collection with id: " + result.insertedId);
                        done(null, body.id);
                    }
                    //we don't need to close the connection thanks to context.callbackWaitsForEmptyEventLoop = false (above)
                    //this will let our function re-use the connection on the next called (if it can re-use the same Lambda container)
                    //db.close();
                });                
                break;
        }
    });
}
