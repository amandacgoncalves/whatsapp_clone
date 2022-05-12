export class Format {

    static getCamelCase(text) {

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}='id'></div>`;

        return Object.keys(div.firstChild.dataset)[0];

    };//static get camel case

    static toTime(duration) {

        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt ((duration / (1000 * 60)) % 60);
        let hours = parseInt ((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

    };//static to time

    static dateToTime (date, locale = 'pt-BR') {

        return date.toLocaleTimeString(this._locale, {
            hour: '2-digit',
            minute: '2-digit'
        })

    }//static date to time

    static timeStampToTime(timeStamp) {

        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';

    }//static time stamp to time

};//class 