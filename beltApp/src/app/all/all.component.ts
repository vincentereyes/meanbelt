import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
	pets: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	let obs = this._httpService.allPets()
  	obs.subscribe(data => {
  		if((data as any).message == "Error"){
  			console.log(data["error"])
  		}
  		else {
  			this.pets = data['data']
  			this.pets.sort(function(a, b){
  				if(a.type < b.type){
  					return -1;
  				}
  				if(a.type > b.type){
  					return 1;
  				}
  				return 0
  		})
  		}
  	})
  }

}
