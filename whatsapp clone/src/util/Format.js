class Format {

    static getCamelCase(text) {

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}='id'></div>`;

        return Object.keys(div.firstChild.dataset)[0];

    };//static get camel case

};//class 