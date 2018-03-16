import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {


	req:any;
	username:any;
	email:any;
	video:any;
  constructor(private _video:AuthService, 
                    private http:Http,
                        private router:Router,
                            private flashMessage:FlashMessagesService) { }

  ngOnInit() {

  	this.req = this._video.getProfile().subscribe(profile=>{
  		this.email = profile.user.email;
  		this.username= profile.user.username;

  	});


  	this.req = this._video.list().subscribe(data=>{
  			this.video = data as [any];
  			//console.log(this.video);
  	})

  }

  permit(id,val,em){
  	const data ={
  		id:id,
  		val:val,
  		em:em,
  	}
  	console.log(data);

  	this.req = this._video.permitrequest(data).subscribe(data=>{
  		if(data.success){
          this.flashMessage.show(data.msg,{cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/share'])
      }

      else{
        this.flashMessage.show(data.msg,{cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/share'])
      }

  	});

}

}
  	

