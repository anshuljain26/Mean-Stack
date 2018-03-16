import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute} from '@angular/router';
import{Http} from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})

export class StoriesComponent implements OnInit {
	req:any;
	user:[any];
	email:any;
   constructor(private flashmessage:FlashMessagesService,
  						private _video:AuthService,
  							private http:Http,
  								private route:ActivatedRoute) { }

  ngOnInit() {
  	//console.log('ans');
  	this.email = JSON.parse(localStorage.getItem('use')).email;
  	//console.log(this.email);
  	this.req = this._video.listuser().subscribe(user=>{
  		this.user = user as [any];
  		//console.log(this.user);
  		
  	});

  }

}
