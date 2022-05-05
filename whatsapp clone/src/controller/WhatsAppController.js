class WhatsAppController {

    constructor() {

        console.log('WhatsAppController OK');

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();

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
            return this;
        };//function hide

        Element.prototype.show = function () {
            this.style.display = 'block';
            return this;
        };//function show

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        };//function toggle

        Element.prototype.on = function (events, fn) {
            events.split(' ').forEach(event=>{
                this.addEventListener(event, fn);
            });//event split
            return this;
        };//function on

        Element.prototype.css = function(styles) {
            for (let name in styles) {
                this.style[name] = styles[name]
            };//for 
            return this;
        };//prototype css

        Element.prototype.addClass = function(name) {
            this.classList.add(name);
            return this;
        };//prototype add class

        Element.prototype.removeClass = function(name) {
            this.classList.remove(name);
            return this;
        };//prototype remove class

        Element.prototype.toggleClass = function(name) {
            this.classList.toggle(name);
            return this;
        };//prototype toggle class

        Element.prototype.hasClass = function(name) {
            return this.classList.contains(name);
        };//prototype has class

    };//elements prototype

    initEvents() {

        this.el.myPhoto.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            this.el.panelEditProfile.addClass('open');

        });//this el my photo

        this.el.btnNewContact.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            this.el.panelAddContact.addClass('open');

        });//this el new contact

        this.el.btnClosePanelEditProfile.on('click', e =>{

            this.el.panelEditProfile.removeClass('open');

        });//this el close edit profile

        this.el.btnClosePanelAddContact.on('click', e=>{

            this.el.panelAddContact.removeClass('open');

        });//this el close add contact

    };//init events

    closeAllLeftPanel() {

        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();

    };//close all left panel

};//class whatsapp controller 