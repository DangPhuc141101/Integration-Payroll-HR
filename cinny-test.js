
// const { createClient } = require('redis');


// const test = async () => {

//     const client = createClient({
//         url:"redis://20.255.56.73:6379/0",
//         db
//     });

//     client.on('error', (err) => console.log('Redis Client Error', err));

//     await client.connect();

//     await client.set('key', 'value');
//     const value = await client.get('key');
// }

// test()
/*
const Redis = require("ioredis");

(async () => {

    const redis = new Redis({
        host: 'redis-15128.c98.us-east-1-4.ec2.cloud.redislabs.com',
        port: 15128,
        password: 'Rc8oCj43ThUWmVoSaa5ZwHH3iZJFc49k',
        db: 0, // Defaults to 0
    }); 

    redis.subscribe("upgrade", (err, count) => {
        console.log('subscribe')
        if (err) {
            // Just like other commands, subscribe() can fail for some reasons,
            // ex network issues.
            console.error("Failed to subscribe: %s", err.message);
        } else {
            // `count` represents the number of channels this client are currently subscribed to.
            console.log(
                `Subscribed successfully! This client is currently subscribed to ${count} channels.`
            );
        }
    })

    redis.on("message", (channel, message) => {
        console.log('connect')
        if (channel === 'upgrade') {
            io.emit('upgrade', 'reload01')
        }

    });
})();
*/

const redis = require('redis');

(async() => {
    const client = redis.createClient({
        host: 'localhost',
        port: '6379',
        password: ''       
    });
    
    client.on('error', (err) => console.log('Redis Client Error rrrrrrrrrrrrrrr', err));
    client.on('connect', function(eror) {
        console.log("Redis connection Established!")
    })
    await client.connect();
    
    await client.set('key', 'value', redis.print);
    const value = await client.get('key');
    console.log(value)
})()
