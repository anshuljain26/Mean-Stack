import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
//import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

username:String;
password:String;

  constructor(
  			private flashMessage:FlashMessagesService,
		    private authService:AuthService,
		    private router:Router
		    //private userIdle: UserIdleService,
	

  	) { }

  ngOnInit() {


  	/*this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(function(){
    	localStorage.clear();
    	//this.flashMessage.show('You are logged out',{cssClass:'alert-danger',timeout:5000});
    	console.log("Logged out");
    });
*/







  }

	onLoginSubmit(){
		const user ={
			username:this.username,
			password:this.password
		}

		this.authService.authenticateUser(user).subscribe(data=>{

			if(data.success){

				this.authService.localstoredata(data.token,data.user);
				this.flashMessage.show('You are now logged in', {
          						cssClass: 'alert-success',
          						timeout: 5000});
        		this.router.navigate(['dashboard']);
      		} 

     		 else {
		        this.flashMessage.show(data.msg, {
		          cssClass: 'alert-danger',
		          timeout: 5000});
		        this.router.navigate(['login']);
					}
			});


		}


		/*
		  stop() {
    		this.userIdle.stopTimer();
  		  }
 
		  stopWatching() {
		    this.userIdle.stopWatching();
		  }
		 
		  startWatching() {
		    this.userIdle.startWatching();
		  }
		 
		  restart() {
		    this.userIdle.resetTimer();
		  }
		  */

}
