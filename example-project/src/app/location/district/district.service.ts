import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from './district';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  constructor(private http: HttpClient) {}

  getDistrict(): Observable<District[]> {
    return this.http.get<District[]>(
      'http://localhost:3000/district?sort=desc'
    );
  }

  AddDistrict(postData: any) {
    return this.http.post('http://localhost:3000/district', postData);
  }

  EditDistrict(postData: any, selectedDistrict: any) {
    return this.http.put(
      `http://localhost:3000/district/${selectedDistrict.id}`,
      postData
    );
  }

  DeleteDistrict(id: number) {
    return this.http.delete(`http://localhost:3000/district/${id}`);
  }
}
