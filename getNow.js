class Time {

    minute;

    second;

    thisMoment;

    constructor() {

        var date = new Date();

        var month = date.getUTCMonth() + 1;

        var thisDay = date.getUTCDate() + '-' +
            month.toString() + '-' +
            date.getFullYear() + '_' +
            date.getHours() + '-' +
            date.getMinutes();

        this.minute = date.getMinutes();

        this.second = date.getSeconds();

        this.thisMoment = thisDay;

    }

}

module.exports = { Time };
