export interface Contact {
  id?: number;
  nombre: string;
  celular: string;
  placa?: string;
}

export interface ContactResponse {
  data: Contact[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface BulkContactRequest {
  rows: Contact[];
}

