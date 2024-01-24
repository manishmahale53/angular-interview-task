import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/user'

  getUserData(){
    return this.http.get(this.url)
  }

  addUser(body:any){
    return this.http.post(this.url, body)
  }

  convertImgaeToBase64(imageUrl: string){
    
  }

  


}
