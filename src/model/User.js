import { Firebase } from "./../util/Firebase";
import { Model } from "./Model";

export class User extends Model {

    constructor (id) {

        super();

        if (id) this.getById(id)
    }//constructor

    get name(){ return this._data.name; }
    set name(value){ this._data.name = value; }

    get email(){ return this._data.email; }
    set email(value){ this._data.email = value; }

    get photo(){ return this._data.photo; }
    set photo(value){ this._data.photo = value; }

    get chatId(){ return this._data.chatId; }
    set chatId(value){ this._data.chatId = value; }


    getById(id) {

        return new Promise ((s, f) =>{

            User.findByEmail(id).onSnapshot(doc =>{

                this.fromJSON(doc.data());
                        s(doc);

            });//user find by email on snapshot

        });//return new promise

    }//get by id

    save() {
        return User.findByEmail(this.email).set(this.toJSON());
    }

    static getRef() {

        return Firebase.db().collection('/users');

    };//static get ref

    static getContactsRef(id) {

        return User.getRef()
        .doc(id)
        .collection('contacts');

    };//get contacts ref

    static findByEmail(email){

        return User.getRef().doc(email)

    };//static find by email

    addContact(contact) {

    return User.getContactsRef(this.email)
        .doc(btoa(contact.email))
        .set(contact.toJSON());

    }//add contact

    getContacts (filter = '') {

        return new Promise ((s, f)=>{

            User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs =>{

                let contacts = [];

                docs.forEach(doc=>{

                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data);

                });//docs for each

                this.trigger('contactschange', docs);
                
                s(contacts);

            });//user get contact ref

        });//return new promise

    }//get contacts 

};//export class