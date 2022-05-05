class WhatsAppController {

    constructor() {

        console.log('WhatsAppController OK');

        this.loadElements();

    };//constructor

    loadElements() {

        this.el = {};

        document.querySelectorAll(['id']).forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;


        });//query selector all


    };//load elements

};//class whatsapp controller 