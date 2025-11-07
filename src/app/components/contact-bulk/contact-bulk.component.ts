import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact, BulkContactRequest } from '../../models/contact.model';

@Component({
  selector: 'app-contact-bulk',
  templateUrl: './contact-bulk.component.html',
  styleUrls: ['./contact-bulk.component.scss']
})
export class ContactBulkComponent {
  jsonText: string = '';
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  exampleJson: string = `{
  "rows": [
    {
      "nombre": "Ana Ruiz",
      "celular": "3002223344",
      "placa": "XYZ987"
    },
    {
      "nombre": "Luis Torres",
      "celular": "3005556677"
    }
  ]
}`;

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.jsonText.trim()) {
      this.errorMessage = 'Por favor ingresa el JSON con los contactos';
      return;
    }

    try {
      const data: BulkContactRequest = JSON.parse(this.jsonText);
      
      if (!data.rows || !Array.isArray(data.rows) || data.rows.length === 0) {
        this.errorMessage = 'El JSON debe contener un array "rows" con al menos un contacto';
        return;
      }

      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.contactService.bulkCreateContacts(data).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = `Se crearon ${data.rows.length} contactos exitosamente`;
          this.jsonText = '';
          setTimeout(() => {
            this.router.navigate(['/contacts']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Error al crear los contactos. Verifica el formato del JSON.';
          }
        }
      });
    } catch (error) {
      this.errorMessage = 'JSON inválido. Por favor verifica el formato.';
      this.isLoading = false;
    }
  }

  loadExample(): void {
    this.jsonText = this.exampleJson;
    this.errorMessage = '';
  }

  goBack(): void {
    this.router.navigate(['/contacts']);
  }
}
