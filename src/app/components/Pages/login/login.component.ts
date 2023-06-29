import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from "src/environments/environment";
import { Component, OnInit } from '@angular/core';

import { SwalPopupService } from 'src/app/services/LocalServices/swal-popup.service';
import { HeroesService } from "src/app/services/heroes.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public statusCreateUser = false;

  /** Formulario reactivo*/
  public formLogin: FormGroup;
  public formCreateUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toast: SwalPopupService,
    private user: HeroesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.destroyLocalStorage();
    this.initForms();
  }

  /** Inicializa los formularios */
  initForms = () => {
    this.formLogin = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      contraseña: ['', [Validators.required]],
    });
    this.formCreateUser = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      contraseña: ['', [Validators.required]],
      nombre_completo: ['', [Validators.required]],
    });
  };

  /** Valida el inicio de sesion del usuario */
  login = () => {
    this.toast.showModalLoading('Cargando...');
    if (this.formLogin.valid) {
      this.user.validateUser(this.formLogin.value).subscribe((response) => {
        if (response['status'] === 1) {
          localStorage.setItem('usuario', this.formLogin.value.usuario);
          localStorage.setItem('id_usuario', response['data'][0]);
          localStorage.setItem('nombre_completo', response['data'][1]);
          this.statusCreateUser = false;
          setTimeout(() => {
            this.router.navigate(['Dashboard']);
            this.toast.closeModalLoading();
          }, 3000)
        } else {
          this.formLogin.reset();
          this.toast.setToastPopup('Usuario o contraseña incorrecta.', 'danger');
        }
      })
    } else {
      this.toast.setToastPopup('Diligencie todos los campos.', 'danger');
    }
  }

  /** Crear usuario */
  createUser = () => {
    if (this.formCreateUser.valid) {
      this.user.createUser(this.formCreateUser.value).subscribe((response) => {
        if (response['status'] === 1) {
          this.toast.setToastPopup('Usuario creado exitosamente', 'success')
          this.statusCreateUser = false;
          this.formCreateUser.reset();
        } else if (response['status'] == 2) {
          this.toast.setToastPopup('Ya este nombre de usuario esta en uso', 'danger')
        } else {
          this.toast.setToastPopup('Ha ocurrido un error, comunicate con un asesor', 'danger')
        }
      })
    } else {
      this.toast.setToastPopup('Todos los campos son requeridos', 'danger');
    }
  }

  /** Retorna al landing */
  goBack = () => {
    this.router.navigate([''], { relativeTo: this.route });
  }

  destroyLocalStorage = () => {
    localStorage.clear();
  }

}
