import { ClassEvent } from "../util/ClassEvent";

export class Model extends ClassEvent{

    constructor () {

        super();
        this._data = {};

    }//constructor

    fromJSON(json){
        this._data = Object.assign(this._data, json);
        this.trigger('datachange', this.toJSON());
    }//from json

    toJSON() {
        return this._data;
    }//to json

}//export class model