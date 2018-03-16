import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-redit-search',
  templateUrl: './redit-search.component.html',
  styleUrls: ['./redit-search.component.css'],
})
export class ReditSearchComponent implements OnInit {

	Search:any;
	model
	limit:any;
	req:any;
	content:any;
	private src;

  constructor(private http:Http, private router:Router, private _video:AuthService) { 

  		this.model = {
            sortby: "Relevance"
        };
  }

  ngOnInit() {
  	
  }

  reditsearch(){
  	const search ={
  		search:this.Search,
  		sortby:this.model.sortby,
  		limit:this.limit
  	}

  	this.Search =" ";
  	this.model.sortby=" ";
  	this.limit=" ";


  	this.req = this._video.reditsearch(search).subscribe(search=>{

  		this.content = search.body.data.children;
  		console.log(this.content )
  		//console.log(search.body.data.children.data);
  	})

  	
  }




}
