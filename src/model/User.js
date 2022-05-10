import { ClassEvent } from "../util/ClassEvent";
import { Firebase } from "./../util/Firebase";

export class User extends ClassEvent {

    static getRef() {

        return Firebase.db().collection('/users');

    };//static get ref

    static findByEmail(email){

        return User.getRef().doc(email)

    };//static find by email

};//export class