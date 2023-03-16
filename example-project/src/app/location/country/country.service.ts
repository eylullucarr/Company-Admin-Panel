import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>('http://localhost:3000/country?sort=desc');
  }

  AddEditCountry(postData: any) {
    return this.http.post('http://localhost:3000/country', postData);
  }

  deleteCountry(CountryId: number) {
    return this.http.delete(`http://localhost:3000/country/${CountryId}`);
  }
}
