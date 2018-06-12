import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendURL } from '../environments/environment';

const url=backendURL.cstring;

@Injectable()
export class AuthService {

  constructor(public http:HttpClient) { }
  
  insert_into_db(data)
  {
    console.log(data.productImage,"insert_into_db");
    let headers = new HttpHeaders();
    const fd = new FormData();
    fd.append('productImage',data.productImage);
     return this.http.post(url+'/products',data);
  }
  show_all()
  {
    
    return this.http.get(url+'/products/show/all');
    
  }
  deleteone(data)
  {
    console.log(data);
    return this.http.get(url+'/products/delete/'+data);
  }
  updateone(data)
  {
    console.log(data);
    return this.http.post(url+'/products/update',data);
  }
}
