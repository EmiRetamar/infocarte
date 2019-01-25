import { Injectable } from '@angular/core';

declare var toastr: any;

@Injectable({
    providedIn: 'root'
})
export class ToasterService {

    constructor() {
        this.config();
    }

    success(titulo: string, mensaje?: string) {
        toastr.success(titulo, mensaje);
    }

    warning(titulo: string, mensaje?: string) {
        toastr.warning(titulo, mensaje);
    }

    error(titulo: string, mensaje?: string) {
        toastr.error(titulo, mensaje);
    }

    info(mensaje: string) {
        toastr.info(mensaje);
    }

    custom() {
        toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
    }

    config() {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
    }

}
