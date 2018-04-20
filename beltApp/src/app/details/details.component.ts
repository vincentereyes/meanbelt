import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	petId: any;
	pet: any;
	clicked: boolean;
  constructor(private _route: ActivatedRoute,
  	private _httpService: HttpService,
  	private _router: Router) { }

  ngOnInit() {
  	this.pet = {
  		name: "",
  		type: "",
  		desc: "",
  		skill1: "",
		skill2: "",
  		skill3: ""

  	}
  	this._route.params.subscribe((params: Params) => {
  		this.petId = params['id']
  	});
  	this.clicked = false;
  	this.getPet(this.petId)
  }
  getPet(id){
  	let obs = this._httpService.getPet(id);
  	obs.subscribe(data => {
  		this.pet = data["data"]
  	})
  }
  like(id){
  	this.clicked = true;
  	let obs = this._httpService.like(id);
  	obs.subscribe(data => {
  		console.log(data)
  		this.getPet(this.petId)
  	})
  }
  adoptPet(id){
  	let obs = this._httpService.adoptPet(id);
  	obs.subscribe(data => {
  		if((data as any).message == "success"){
  			this._router.navigate([''])
  		}
  	})
  }
}
