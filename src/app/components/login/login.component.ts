import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['cand_0015@larueda.com', [Validators.required, Validators.email]],
      password: ['Password123', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          
          // Mostrar respuesta exitosa en consola
          console.group('✅ Respuesta Exitosa (Login)');
          console.log(JSON.stringify(response, null, 2));
          console.groupEnd();
          
          this.router.navigate(['/contacts']);
        },
        error: (error) => {
          this.isLoading = false;
          
          // Mostrar error en consola
          console.group('❌ Error (Login)');
          console.error(JSON.stringify(error.error || error, null, 2));
          console.groupEnd();
          
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
          }
        }
      });
    }
  }
}
