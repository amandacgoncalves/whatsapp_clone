import {Format} from './../util/Format';
import {CameraController} from './CameraController';
import {DocumentPreviewController} from './DocumentPreviewController';

export class WhatsAppController {

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

        HTMLFormElement.prototype.getForm = function () {

            return new FormData(this);

        };//prototype html form element

        HTMLFormElement.prototype.toJSON = function () {

            let json = {};

            this.getForm().forEach((value, key)=> {

                json[key] = value;

            });//this get form

            return json;

        };//prototype html to json

    };//elements prototype

    initEvents() {

        this.el.myPhoto.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);

        });//this el my photo

        this.el.btnNewContact.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);

        });//this el new contact

        this.el.btnClosePanelEditProfile.on('click', e =>{

            this.el.panelEditProfile.removeClass('open');

        });//this el close edit profile

        this.el.btnClosePanelAddContact.on('click', e=>{

            this.el.panelAddContact.removeClass('open');

        });//this el close add contact

        this.el.photoContainerEditProfile.on('click', e=>{

            this.el.inputProfilePhoto.click();

        });//this el photo container edit profile

        this.el.inputNamePanelEditProfile.on('keypress', e=>{

         if (e.key === 'Enter') {

            e.preventDefault();
            this.el.btnSavePanelEditProfile.click();

         } 

        });//this el input name panel edit profile

        this.el.btnSavePanelEditProfile.on('click', e=>{

            console.log(this.el.inputNamePanelEditProfile.innerHTML);

        });// this el btn save panel edit profile

        this.el.formPanelAddContact.on('submit', e=>{

            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);

        });//this el form panel add contact

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{

            item.on('click', e=>{

                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });//this el main

            });//item on click

        });//this el contacts messages list

        this.el.btnAttach.on('click', e=>{

            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));

        });//this el btn attach

        this.el.btnAttachPhoto.on('click', e=>{

            this.el.inputPhoto.click();

        });//this el btn attach PHOTO

        this.el.inputPhoto.on('change', e=>{

            console.log(this.el.inputPhoto.files);

            [...this.el.inputPhoto.files].forEach(file =>{

                console.log(file);

            });//each file

        });//this el INPUT PHOTO CHANGE

        this.el.btnAttachCamera.on('click', e=>{

            this.closeAllMainPanels();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                height:'100%'
            });

        this.el.btnClosePanelCamera.on('click', e =>{

            this.closeAllMainPanels();
            this.el.panelMessagesContainer.show();
            this._camera.stop();

        });//this el btn close panel camera

        this.el.btnTakePicture.on('click', e=>{

            let dataUrl = this._camera.takePicture();

            this.el.pictureCamera.src = dataUrl;
            this.el.pictureCamera.show();
            this.el.videoCamera.hide();
            this.el.btnReshootPanelCamera.show();
            this.el.containerTakePicture.hide();
            this.el.containerSendPicture.show();

        });//this el btn take picture

        this._camera = new CameraController(this.el.videoCamera);

        });//this el btn attach CAMERA

        this.el.btnReshootPanelCamera.on('click', e=>{

            this.el.pictureCamera.hide();
            this.el.videoCamera.show();
            this.el.btnReshootPanelCamera.hide();
            this.el.containerTakePicture.show();
            this.el.containerSendPicture.hide();

        });//this el btn reshoot panel camera

        this.el.btnSendPicture.on('click', e=>{

            console.log(this.el.pictureCamera.src)

        });//this el btn send picture

        this.el.btnAttachDocument.on('click', e=>{

            this.closeAllMainPanels();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                height:'100%'
            });//thus close all main panels

            this.el.inputDocument.click();

        });//this el btn attach DOCUMENT

        this.el.inputDocument.on('change', e=>{

            if (this.el.inputDocument.files.length) {

                let file = this.el.inputDocument.files[0];

                this._documentPreviewController = new DocumentPreviewController(file)

                this._documentPreviewController.getPreviewData().then(data=>{

                    console.log('ok', data);

                }).catch(err => {

                    console.log('err', err);

                });

            }

        });// this el input document

        this.el.btnClosePanelDocumentPreview.on('click', e=>{

            this.closeAllMainPanels();
            this.el.panelMessagesContainer.show();

        });// this el btn close panel document preview

        this.el.btnSendDocument.on('click', e=>{

            console.log('send document')

        });//this el btn send document

        this.el.btnAttachContact.on('click', e=>{

            this.el.modalContacts.show();

        });//this el btn attach CONTACT

        this.el.btnCloseModalContacts.on('click', e =>{

            this.el.modalContacts.hide();

        });// this el btn close modal contacts

        this.el.btnSendMicrophone.on('click', e =>{

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTime();

        });//this el btn send microphone

        this.el.btnCancelMicrophone.on('click', e=>{

            this.closeRecordMicrophone();

        });//this el btn cancel microphone

        this.el.btnFinishMicrophone.on('click', e=>{

            this.closeRecordMicrophone();

        });//this el btn finish microphone

        this.el.inputText.on('keypress', e=>{

            if (e.key === 'Enter' && !e.ctrlKey) {

                e.preventDefault();
                this.el.btnSend.click();

            }

        });//this el input text key press

        this.el.inputText.on('keyup', e=>{

            if (this.el.inputText.innerHTML && this.el.inputText.innerHTML != '<br>') {

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            } else {

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();

            }

        });// this el input text

        this.el.btnSend.on('click', e=>{

            console.log(this.el.inputText.innerHTML);

        });//this el btn send

        this.el.btnEmojis.on('click', e=>{

            this.el.panelEmojis.toggleClass('open');

        });//this el btn emojis

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji=>{

            emoji.on('click', e=>{

                console.log(emoji.dataset.unicode);

                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name=>{
                    img.classList.add(name);
                });//emoji class list

                let cursor = window.getSelection();

                if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                let range = document.createRange();

                range = cursor.getRangeAt(0);
                range.deleteContents();

                let frag = document.createDocumentFragment();

                frag.appendChild(img);

                range.insertNode(frag);

                range.setStartAfter(img);

                this.el.inputText.dispatchEvent(new Event('keyup'));

            });//emoji on click

        });//this el panel emojis

    };//init events

    startRecordMicrophoneTime() {

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=>{

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);

        }, 100);

    };//start record microphone time

    closeRecordMicrophone() {

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);

    };//close record microphone

    closeAllMainPanels(){

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');


    };//close all main panels

    closeMenuAttach(e) {

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');

    };//close menu attach

    closeAllLeftPanel() {

        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();

    };//close all left panel

};//class whatsapp controller 