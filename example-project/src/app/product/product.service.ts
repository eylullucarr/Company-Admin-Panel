import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/sector?sort=desc');
  }

  AddEditProduct(
    postData: any,
    selectedPdt: any //türünü fa
  ) {
    if (!selectedPdt) {
      return this.http.post('http://localhost:3000/sector', postData);
    } else {
      return this.http.put(
        `http://localhost:3000/sector/${selectedPdt.id}`,
        postData
      );
    }
  }

  deleteProduct(productId: number) {
    return this.http.delete(`http://localhost:3000/sector/${productId}`);
  }
}
