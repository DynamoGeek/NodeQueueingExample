"use strict";
import bull from 'bull';
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// This is a copy of the job in worker/jobs/DoWork.js so we can directly compare queueing vs inline execution
class DoWork {
    constructor(secondsToBurn) {
        this.secondsToBurn = secondsToBurn;
    }

    execute() {
        this.start = new Date() / 1000;
        while((new Date() / 1000) - this.start <= this.secondsToBurn) {
            // Do as much nothing as possible in the number of seconds we've been given
        }
        return;
    }
}

(async function init() {
    let queue = new bull(
        process.env.DEFAULT_JOB_QUEUE,
        {
            redis: {host: process.env.REDIS_HOST, port: process.env.REDIS_PORT},
        }
    );
    const startQueue = Date.now() / 1000;
    for (let i = 1; i <= 10; i++) {
        queue.add({job: 'DoWork', secondsToBurn: 1});
    }
    console.log(`Took ${((Date.now() / 1000) - startQueue).toFixed(3)} seconds to queue 10 jobs`);
    
    const startExecute = Date.now() / 1000;
    for (let i = 1; i <= 10; i++) {
        (new DoWork(1)).execute();
        console.log(`Took ${((Date.now() / 1000) - startExecute).toFixed(3)} seconds to execute ${i} out of 10 times`);
    }
})();