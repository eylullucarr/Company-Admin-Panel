import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user?sort=desc');
  }

  AddEditUser(
    postData: any,
    selectedUser: any //türünü fark etmez
  ) {
    if (!selectedUser) {
      return this.http.post('http://localhost:3000/user', postData);
    } else {
      return this.http.put(
        `http://localhost:3000/user/${selectedUser.id}`,
        postData
      );
    }
  }

  deleteUser(userId: number) {
    return this.http.delete(`http://localhost:3000/user/${userId}`);
  }
}
