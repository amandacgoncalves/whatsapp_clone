const pdfjsLib = require ('pdfjs-dist');
const path = require ('path');

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, 
'../../dist/pdf.worker.bundle.js');

export class DocumentPreviewController {

    constructor (file) {

        this._file = file;

    };//constructor

    getPreviewData() {

        return new Promise((s, f)=>{

            let reader = new FileReader();

            switch (this._file.type) {

                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                reader.onload = e => {

                    s({
                        src: reader.result,
                        info: this._file.name
                    });

                }//reader on load
                reader.onerror = e => {

                    f(e);

                }//reader on error
                reader.readAsDataURL(this._file);
                break;

                case 'application/pdf':

                reader.onload = e => {

                    pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf => {

                        pdf.getPage(1).then(page => {

                            let viewport = page.getViewport(1);

                            let canvas = document.createElement('canvas');
                            let canvasContext = canvas.getContext('2d');

                            canvas.width = viewport.width;
                            canvas.height = viewport.height;

                            page.render({
                                canvasContext,
                                viewport
                            }).then(()=>{

                                let _s = (pdf.numPages > 1) ? 's' : '';

                                s({
                                    src: canvas.toDataURL('image/png'),
                                    info: `${pdf.numPages} página${_s}`
                                });

                            }).catch(err=>{
                                f(err);
                            });

                        }).catch(err =>{
                            f(err);
                        });//catch

                    }).catch(err=>{

                        f(err);

                    });//catch

                }//reader on load

                reader.readAsArrayBuffer(this._file);

                break;

                default:

                f();

            };//switch

        });//return new promise

    };//get preview data

};//export class document preview controller