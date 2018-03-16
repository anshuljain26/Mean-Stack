import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import{Router} from '@angular/router';
import {Http} from '@angular/http';

import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-dashhboard',
  templateUrl: './dashhboard.component.html',
  styleUrls: ['./dashhboard.component.css']
})


export class DashhboardComponent implements OnInit {

	req:any;
	video:any;
	user:any;
  username:any;



  constructor(private router:Router, private http:Http, private _video: AuthService) {}

  ngOnInit() {

  	this.req = this._video.getProfile().subscribe(profile=>{

  		this.user = profile.user.email;
      this.username = profile.user.username

  	})

  	this.req = this._video.list().subscribe(data=>{

  		this.video = data
  		console.log(this.video)
  		

  	})

  	


  }

}
