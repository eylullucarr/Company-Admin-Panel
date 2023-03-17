import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from './city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  getCity(): Observable<City[]> {
    return this.http.get<City[]>('http://localhost:3000/city?sort=desc');
  }

  AddCity(postData: any) {
    return this.http.post('http://localhost:3000/city', postData);
  }

  EditCity(postData: any, selectedCity: any) {
    return this.http.put(
      `http://localhost:3000/city/${selectedCity.id}`,
      postData
    );
  }

  DeleteCity(id: number) {
    return this.http.delete(`http://localhost:3000/city/${id}`);
  }
}
