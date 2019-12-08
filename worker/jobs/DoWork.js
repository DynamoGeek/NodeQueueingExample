class DoWork {
    constructor(secondsToBurn) {
        this.secondsToBurn = secondsToBurn;
    }

    execute() {
        this.start = new Date() / 1000;
        while((new Date() / 1000) - this.start <= this.secondsToBurn) {
            // Do as much nothing as possible in the number of seconds we've been given
        }
        console.log(`Executed for ${this.secondsToBurn} seconds`)
        return;
    }
}

export default DoWork;