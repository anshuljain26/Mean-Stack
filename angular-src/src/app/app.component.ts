import { Component, OnInit} from '@angular/core';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
//import {Keepalive} from '@ng-idle/keepalive';
import { FlashMessagesService } from 'angular2-flash-messages';
import{Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user:any;
  req:any;
  //detail:any;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(private idle:Idle,
                        private flashMessage:FlashMessagesService,
                          private router:Router,
                            private _video:AuthService){


  	idle.setIdle(5);

  	idle.setTimeout(3600);

  	idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

  	idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;

      if (localStorage.getItem("use") === null) {
  //	...
  		this.router.navigate(['/login']);
  		return true;
		}
		else{

     	 localStorage.clear();
      	this.flashMessage.show("You have been logged out due to timeout",{cssClass:'alert-danger',timeout:5000});
  		}
    });

    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {
    //	console.log('You will time out in ' + countdown + ' seconds!')

    });

    // sets the ping interval to 15 seconds
    //keepalive.interval(15);

    //keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();









  }

  reset(){

  	console.log("hii");
  	this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;


  }

  ngOnInit(){ 

    const options = {
        audio: false,
        video: true,
        width: 500,
        height: 500
    };
  const onSuccess = (stream: MediaStream) => {};
  const onError = (err) => {};

  var email = JSON.parse(localStorage.getItem('use')).email;

  Observable.interval(3000).subscribe(x=>{

    this.req = this._video.list().subscribe(data=>{

      for(var i=0;i<data.length;i++){

        for(var j=0;j<data[i].Watch.length;j++){
            if(data[i].Watch[j].user == email && data[i].Watch[j].enable ==1){
              this.flashMessage.show("Your Watch later for "+ data[i].slug+" is ready",{cssClass:'alert-info'});
            }
        }
      }
    })
  })
  
}





}
