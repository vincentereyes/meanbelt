import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newPet: any;
	errors: any;
  constructor(private _httpService: HttpService,
  	private _router: Router) { }

  ngOnInit() {
  	this.newPet = {
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
  }
  onSubmit(){
  	let obs = this._httpService.newPet(this.newPet)
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

}
