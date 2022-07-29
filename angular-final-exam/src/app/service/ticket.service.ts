import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticket} from '../ticket';
import {Bus} from '../bus';

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  getTicketList(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(API_URL + '/list-ticket');
  }

  getBusList(): Observable<Bus[]> {
    return this.http.get<Bus[]>(API_URL + '/list-bus');
  }

  create(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(API_URL + '/ticket/create', ticket);
  }

  findById(id: number): Observable<Ticket> {
    console.log('check api');
    console.log(this.http.get<Ticket>(`${API_URL}/list-ticket/${id}`).subscribe(data => {
      console.log(data);
    }));
    return this.http.get<Ticket>(`${API_URL}/list-ticket/${id}`);
  }

  edit(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${API_URL}/ticket/order`, ticket);
  }

  searchByDestination(des: string, arrive: string) {
    return this.http.get<Ticket[]>(`${API_URL}/search/${des}&${arrive}`);
  }
}
