import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationList } from './location-list';

@Injectable({
  providedIn: 'root',
})
export class LocationListService {
  constructor(private http: HttpClient) {}

  getLocation(): Observable<LocationList[]> {
    return this.http.get<LocationList[]>('http://localhost:3000/location');
  }
}
