import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from "src/environments/environment";
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SwalPopupService } from 'src/app/services/LocalServices/swal-popup.service';
import { ActivitiesService } from "src/app/services/activities.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /** Formulario reactivo*/
  public formCreateAct: FormGroup;

  /** Ruta para imagenes angular */
  public urlImageAngular = environment.urlImage;
  public storageUrl = environment.storageUrl;

  /** Crear usuario o iniciar sesion */
  public statusSession = false;
  public nameUser = localStorage.getItem('nombre_completo');

  /** Almacena la data del usuario logueado */
  public allActivities: any = [];

  /** Listado de cards a mostrar */
  public listCards = [
    {
      id: 0,
      name: 'Crear actividades',
      color: '#EB5E3E',
      icon: 'fab fa-cloudsmith',
    },
    {
      id: 1,
      name: 'Ver actividades',
      color: '#9F84F9',
      icon: 'fas fa-percent',
    }
  ];

  /** Id del card seleccionado */
  public idCardSelected = this.listCards[0].id;

  constructor(
    private activities: ActivitiesService,
    private formBuilder: FormBuilder,
    private toast: SwalPopupService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForms();
    this.getInfo();
  }

  /** Inicializa los formularios */
  initForms = () => {
    this.formCreateAct = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      tiempoActividad: this.formBuilder.array([])
    });
  };

  /** Desestructuramos el formGroup */
  get tiempoActividad(): FormArray {
    return this.formCreateAct.get('tiempoActividad') as FormArray;
  }

  /** Añadimos un nuevo group al tiempo */
  anadirtiempoActividad() {
    const tiempo = this.formBuilder.group({
      fecha: new FormControl(''),
      tiempo: new FormControl(''),
    });

    this.tiempoActividad.push(tiempo);
  }

  /** borramos posicion del formGroup */
  borrarTiempoActividad(indice: number) {
    this.tiempoActividad.removeAt(indice);
  }

  /** Trae toda la informacion del usuario */
  getInfo = () => {
    this.resetValues();
    const params = new FormData();
    params.append('id_usuario', localStorage.getItem('id_usuario'));
    this.activities.getActivities(params).subscribe((response) => {
      if (response['status'] === 1) {
        this.allActivities = response['data'];
      } else {
        this.toast.setToastPopup('Ha ocurrido un error, comunicate con un asesor', 'danger');
      }
    })
  }

  /** Redireccionar */
  login = (log = 'logIn') => {
    if (log == 'logOut') this.statusSession = false; localStorage.clear();
    if (!this.statusSession) {
      this.router.navigate(['Login']);
    } else {
      this.router.navigate(['Landing']);
    }
  }

  /** Almacena las actividades */
  saveActivities = () => {
    if (this.formCreateAct.valid) {
      if (this.countActivities(this.formCreateAct.value.tiempoActividad) <= 8) {
        this.toast.showModalLoading('Guardando');
        const params = new FormData();
        params.append('id_usuario', localStorage.getItem('id_usuario'));
        params.append('descripcion', this.formCreateAct.value.descripcion);
        params.append('tiempo', JSON.stringify(this.formCreateAct.value.tiempoActividad));
        this.activities.save(params).subscribe((response: any) => {
          if (response['status'] === 1) {
            this.getInfo();
            setTimeout(() => {
              this.toast.closeModalLoading();
            }, 1000)
          } else {
            this.toast.setToastPopup('Ha ocurrido un error al guardar, comunicate con un asesor.', 'danger');
          }
          this.tiempoActividad.clear();
        })
      } else {
        this.toast.setToastPopup('El tiempo limite por actividad es 8, favor validar.', 'danger');
      }
    } else {
      this.toast.setToastPopup('Todos los campos con * son requeridos.', 'danger');
    }
  }

  /** Cuenta que las horas de actividad no sean mayores a 8 */
  countActivities = (activities) => {
    let tiempo = 0;
    activities.map((elm) => { return tiempo = tiempo + elm.tiempo });
    return tiempo;
  }

  resetValues = () => {
    this.formCreateAct.reset();
    this.allActivities = [];
  }
}
