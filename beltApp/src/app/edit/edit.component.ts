import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	pet: any;
	errors: any;
	petId: any;
  constructor(private _httpService: HttpService,
  	private _router: Router,
  	private _route: ActivatedRoute) { }

  ngOnInit() {
  	this.pet = {
  		name: "",
  		type: "",
  		desc: "",
  		skill1: "",
		skill2: "",
  		skill3: ""

  	}
  	this.errors = {
  		desc: {},
  		name: {},
  		type: {},
  	}
  	this._route.params.subscribe((params: Params) => {
  		this.petId = params['id']
  	});
  	this.getPet(this.petId)
  }
  onSubmit(){
  	let obs = this._httpService.savePet(this.petId, this.pet)
  	obs.subscribe(data => {
  		if((data as any).message == "Error"){
  			console.log(data)
  			this.errors = data["error"]
  		}
  		if((data as any).message == "Unique Error"){
  			console.log(data)
  			this.errors.name.message = "Pet already exists";
  		}
  		else {
  			this._router.navigate([''])
  		}
  	})
  }
  getPet(id){
  	let obs = this._httpService.getPet(id);
  	obs.subscribe(data => {
  		this.pet = data["data"]
  	})
  }

}
