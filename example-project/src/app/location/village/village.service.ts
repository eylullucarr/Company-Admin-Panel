import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Village } from './village';

@Injectable({
  providedIn: 'root',
})
export class VillageService {
  constructor(private http: HttpClient) {}

  getVillage(): Observable<Village[]> {
    return this.http.get<Village[]>('http://localhost:3000/village?sort=desc');
  }

  AddVillage(postData: any) {
    return this.http.post('http://localhost:3000/village', postData);
  }

  EditVillage(postData: any, selectedVillage: any) {
    return this.http.put(
      `http://localhost:3000/village/${selectedVillage.id}`,
      postData
    );
  }

  DeleteVillage(id: number) {
    return this.http.delete(`http://localhost:3000/village/${id}`);
  }
}
