class WhatsAppController {

    constructor() {

        console.log('WhatsAppController OK');

        this.elementsPrototype();
        this.loadElements();

    };//constructor

    loadElements() {

        this.el = {};

        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;


        });//query selector all


    };//load elements

    elementsPrototype() {

        Element.prototype.hide = function () {
            this.style.display = 'none';
        };//function hide

        Element.prototype.show = function () {
            this.style.display = 'block';
        };//function show

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
        };//function toggle


    };//elements prototype

};//class whatsapp controller 