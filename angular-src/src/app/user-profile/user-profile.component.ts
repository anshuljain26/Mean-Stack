import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

import {Http} from '@angular/http';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	req:any;
	username:any;
	loggedinuser:any;
	id:any;
  user:any;

  constructor(private router:Router, private http:Http, private routes:ActivatedRoute, private _video:AuthService) { 

}

  ngOnInit() {


  	this.req = this.routes.params.subscribe(params=>{
  		this.username = params['username'];

  		var user = JSON.parse(localStorage.getItem('use'));

  		const data ={
  		username:this.username,
  		id:user.id,
  		loggedinuser:user.username
  	}

  		this.req = this._video.profile_by_username(data).subscribe(data=>{
  			//console.log(data.user);
        this.user = data.user;


        const hist = {
          email:user.email,
          slug:'profile/'+ this.username
        }

        console.log(hist);

        this.req = this._video.history(hist).subscribe(history=>{
          console.log(history);
        })


  		})
  		
  	});

    
    

  
  	
  }

}
