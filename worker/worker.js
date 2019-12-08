"use strict";
import bull from 'bull';
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

(async function init() {
    let queue = new bull(
        process.env.DEFAULT_JOB_QUEUE,
        {
            redis: {host: process.env.REDIS_HOST, port: process.env.REDIS_PORT},
        }
    );
    queue.process(
        parseInt(process.env.DEFAULT_JOB_QUEUE_CONCURRENCY),
        __dirname + '/processor.js'
    );
    queue.on('stalled', function(job){
        console.error('Job stalled.', {metaData: {job: job}});
    });

    queue.on('failed', function(job) {
        console.error('Job failed.', {metaData: {job: job}});
    });
})();