import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { AuthService } from '../../services/auth.service';
import { Contact, ContactResponse } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  currentPage: number = 1;
  perPage: number = 10;
  total: number = 0;
  lastPage: number = 1;
  searchQuery: string = '';
  isLoading: boolean = false;
  user: any = null;

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.contactService.getContacts(this.currentPage, this.perPage, this.searchQuery).subscribe({
      next: (response: ContactResponse) => {
        this.contacts = response.data || [];
        this.currentPage = response.current_page || 1;
        this.perPage = response.per_page || 10;
        this.total = response.total || 0;
        this.lastPage = response.last_page || 1;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadContacts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadContacts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToCreate(): void {
    this.router.navigate(['/contacts/create']);
  }

  goToBulk(): void {
    this.router.navigate(['/contacts/bulk']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get pages(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.lastPage, startPage + maxPages - 1);
    
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}
