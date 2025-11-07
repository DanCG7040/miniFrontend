import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact, ContactResponse, BulkContactRequest } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContacts(page: number = 1, perPage: number = 10, search?: string): Observable<ContactResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) {
      params = params.set('q', search);
    }

    return this.http.get<ContactResponse>(`${this.apiUrl}/contacts`, { params });
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/contacts`, contact);
  }

  bulkCreateContacts(contacts: BulkContactRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/contacts/bulk`, contacts);
  }
}

