import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocation(): Observable<Location[]> {
    return this.http.get<Location[]>(
      'http://localhost:3000/location?sort=desc'
    );
  }

  AddEditLocation(postData: any, selectedLct: any) {
    if (!selectedLct) {
      return this.http.post('http://localhost:3000/location', postData);
    } else {
      return this.http.put(
        `http://localhost:3000/location/${selectedLct.id}`,
        postData
      );
    }
  }

  deleteLocation(locationId: number) {
    return this.http.delete(`http://localhost:3000/location/${locationId}`);
  }
}
