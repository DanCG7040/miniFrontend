import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent {
  contactForm: FormGroup;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      placa: ['']
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const contact: Contact = {
        nombre: this.contactForm.value.nombre,
        celular: this.contactForm.value.celular,
        placa: this.contactForm.value.placa || undefined
      };

      this.contactService.createContact(contact).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Contacto creado exitosamente';
          this.contactForm.reset();
          setTimeout(() => {
            this.router.navigate(['/contacts']);
          }, 1500);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Error al crear el contacto. Por favor intenta de nuevo.';
          }
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/contacts']);
  }
}
