import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalPopupService {
  public attribute?: Attr;

  private colors = {
    success: '#2ecc71',
    danger: '#ff2c4b',
  };

  private toast = Swal.mixin({
    showConfirmButton: false,
    position: 'bottom-end',
    timerProgressBar: true,
    toast: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
      toast.addEventListener('click', Swal.clickCancel);
    },
  });

  constructor() {
    setTimeout(() => this.initAttribute(), 0);
  }

  public setToastPopup = (
    title: any,
    status: 'success' | 'danger',
    timer: number = 3000
  ) =>
    this.toast.fire({ title, background: this.colors[status], timer: timer });

  public showModalConfirm = (title: any, text = '', callback: any) => {
    Swal.fire({
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      showCancelButton: true,
      background: '#FFF',
      html: `
        <div ${this.attribute?.name} class="primary-typography">
          <h3 ${this.attribute?.name
        } class="title-style margin-bottom-0">${title}</h3>
          ${text !== ''
          ? `<p ${this.attribute?.name} class="title-style lower-font margin-bottom-100-rem">
          ${text}</p>`
          : ''
        }
        </div>
      `,
    }).then((response) => callback(response));

    const buttonSend = document.querySelector('.swal2-confirm');
    const buttonBack = document.querySelector('.swal2-cancel');

    // buttonBack.setAttribute(this.attribute.name, this.attribute?.value);
    // buttonSend.setAttribute(this.attribute.name, this.attribute?.value);

    // buttonBack.classList.replace('swal2-styled', 'primary-button');
    // buttonBack.classList.add('bg-tertiary-background-palette-important');
    // buttonBack.classList.add('margin-left-50-rem');

    // buttonSend.classList.replace('swal2-styled', 'primary-button');
  };

  public showModalLoading = (message = 'Cargando información...') =>
    Swal.fire({
      html: `
        <div ${this.attribute?.name} class="primary-typography">
          <h3 ${this.attribute?.name} class="title-style">${message}</h3>
          <i ${this.attribute?.name} class="fas fa-sync fa-spin fa-2x cl-primary-background-palette" style="margin-bottom:1rem"></i>
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
    });

  public closeModalLoading = () => Swal.close();

  /**
   * Obtiene el atributo ng del componente
   * @param elementRef Elemento de referencia
   */
  private getComponentAttribute = (elementRef: HTMLElement): Attr[] =>
    Array.from(elementRef.attributes).filter((elm: Attr) =>
      elm.name.includes('_ng')
    );

  public initAttribute = (id: any = '.page-content') => {
    if (document.querySelector(id)) {
      this.attribute = this.getComponentAttribute(
        document.querySelector(id)
      )[0];
    }
  };
}
