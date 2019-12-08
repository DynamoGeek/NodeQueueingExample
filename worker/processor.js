import DoWork from './jobs/DoWork';
module.exports = async function(queueJob) {
    switch(queueJob.data.job) {
        case 'DoWork':
            (new DoWork(queueJob.data.secondsToBurn)).execute();
            break;
    }
};