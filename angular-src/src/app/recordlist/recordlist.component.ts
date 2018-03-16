import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute} from '@angular/router';
import{Http} from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-recordlist',
  templateUrl: './recordlist.component.html',
  styleUrls: ['./recordlist.component.css']
})
export class RecordlistComponent implements OnInit {

	email:any;
	req:any;
	slug:any;
	routesub:any;
	user:any;
	src:any;
  constructor(private flashmessage:FlashMessagesService,
  						private _video:AuthService,
  							private http:Http,
  								private route:ActivatedRoute) { }

  ngOnInit() {
  	this.email = JSON.parse(localStorage.getItem('use')).email;

  	this.routesub = this.route.params.subscribe(params=>{
  		this.slug = params['slug'];
  	});

  }

}
