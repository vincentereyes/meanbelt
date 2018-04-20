import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  newPet(pet){
  	return this._http.post('/pet', pet)
  }

  allPets(){
  	return this._http.get('/pets')
  }

  getPet(id){
  	return this._http.get('/pets/' + id)
  }

  like(id){
  	return this._http.put('/pets/like/' + id, id)
  }

  adoptPet(id){
  	return this._http.delete('/pets/' + id)
  }

  savePet(id, pet){
  	return this._http.put('/pets/' + id, pet)
  }
}
