import { Component, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";

import { SwalPopupService } from 'src/app/services/LocalServices/swal-popup.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  /** Ruta para imagenes angular */
  public urlImageAngular = environment.urlImage;
  public storageUrl = environment.storageUrl;

  public statusSession = false;

  /** Listado de cards a mostrar */
  public listCards = [
    {
      id: 0,
      name: 'Ver actividades',
      color: '#9F84F9',
      icon: 'fas fa-percent',
    },
    {
      id: 1,
      name: 'Ver tiempos reportados',
      color: '#3ABCB1',
      icon: 'fas fa-tag',
    },
    {
      id: 2,
      name: 'Crear actividades',
      color: '#EB5E3E',
      icon: 'fab fa-cloudsmith',
    },
  ];

  /** Id del card seleccionado */
  public idCardSelected = 0;

  constructor(
    private toast: SwalPopupService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /** Redirecciona a el inicio de sesion */
  login = () => {
    if (!this.statusSession) {
      this.router.navigate(['Login'], { relativeTo: this.route });
    }
  }
}
