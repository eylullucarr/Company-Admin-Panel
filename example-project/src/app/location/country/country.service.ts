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

  AddCountry(postData: any) {
    return this.http.post('http://localhost:3000/country', postData);
  }

  EditCountry(postData: any, selectedCountry: any) {
    return this.http.put(
      `http://localhost:3000/country/${selectedCountry.id}`,
      postData
    );
  }

  deleteCountry(id: number) {
    return this.http.delete(`http://localhost:3000/country/${id}`);
  }
}
