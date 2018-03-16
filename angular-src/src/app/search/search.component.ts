import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


import {Http} from '@angular/http';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	SearchQuery:string;
  req:any;
  query:any;
  videoList:[any];
  constructor(private router:Router, private _video:AuthService, private http:Http) { }

  ngOnInit() {

    this.req = this._video.search(this.query).subscribe(data=>{

      this.videoList = data as [any];

      //this.query ="";

      //console.log(this.videoList)


    })
  }

  formSubmit(event,formData){
  		console.log(formData)
  	//console.log(formData.value)
  	 this.query = formData.value['q']
  	if(this.query){
  		this.router.navigate(['/search',{q:this.query}])
  }
  this.SearchQuery ="";
  }

}
