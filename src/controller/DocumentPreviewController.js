export class DocumentPreviewController {

    constructor (file) {

        this._file = file;

    };//constructor

    getPreviewData() {

        return new Promise((s, f)=>{

            switch (this._file.type) {

                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                let reader = new FileReader();
                reader.onload = e => {

                    s(reader.result);

                }
                reader.onerror = e => {

                    f(e);

                }
                reader.readAsDataUrl(this._file);
                break;

                case 'application/pdf':

                break;

                default:

                f();

            };//switch

        });//return new promise

    };//get preview data

};//export class document preview controller