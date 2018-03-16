import { Component, OnInit } from '@angular/core';
import {AuthService } from '../services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  req:any;

user:Object;

  constructor(
  		private flashMessage:FlashMessagesService,
		private authService:AuthService,
		private router:Router,
    private routes:ActivatedRoute


  	) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user);
    },
    err => {
      console.log(err);
      return false;
    });



  }

}
