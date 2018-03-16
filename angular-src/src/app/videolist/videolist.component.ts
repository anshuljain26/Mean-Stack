import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css'],
  providers:[AuthService]
})
export class VideolistComponent implements OnInit,OnDestroy {

	req:any;
	todayDate;
	videolist:[any];
  username:any;
  email:any;
  result = [];

  constructor(private _video:AuthService,
                    private flashMessage:FlashMessagesService,
                          private router:Router) { }

  ngOnInit() {


  	this.todayDate = new Date();
  	this.req = this._video.list().subscribe(data=>{
      //console.log(data)
  		//console.log(data);
  		this.videolist = data as [any];

      
      var emai = JSON.parse(localStorage.getItem('use')).email;

      for(var i=0;i<this.videolist.length;i++){
        var ti=0;
          for(var j=0;j<this.videolist[i].staff.length;j++){
            if(emai==this.videolist[i].staff[j]){
                this.result.push(emai);
                  ti=1;
                  break;
            }
          }
          if(ti==0){
            this.result.push("undefined@gmail.com");
          }
      }

      //console.log(this.result);

  	})

     this._video.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.email = profile.user.email;

      //console.log(this.username);
    },
    err => {
      localStorage.clear();
      return false;
    });



  }

  getEmbedUrl(item){
  	return 'https://youtube.com/embed/' + item.embed + '?ecver=2'
  }

  deleteVideo(id){
    this.req = this._video.deleteVideo(id).subscribe(data=>{
      this._video.list().subscribe(videos=>{
        this.videolist = videos as [any];
      });
      if(data.success==true){
        this.flashMessage.show('Video is successfully Deleted',{cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/videos']);
        //console.log("Video is successfully Deleted");
      }
      else{
        this.flashMessage.show('Error occured ',{cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/videos']);
      }
    })

  }



  ngOnDestroy(){
    this.req.unsubscribe()
  }
  updatevi(item){
    
  }

  likeBlog(id){
    const content = {
      id:id,
      username:this.username
    }
    if(this.username){
    this.req = this._video.likepost(content).subscribe(data=>{
      if(data.success)
        this.flashMessage.show(data.msg,{cssClass:'alert-success',timeout:3000});
      else 
        this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:3000});
      this.req = this._video.list().subscribe(data=>{
      //console.log(data)
      //console.log(data);
      this.videolist = data as [any];
    })
    })
  }
  else{
      this.router.navigate(['/login']);
  }
}

   dislikeBlog(id){
     const content = {
      id:id,
      username:this.username
    }
    if(this.username){
    this.req = this._video.dislikepost(content).subscribe(data=>{
      if(data.success)
        this.flashMessage.show(data.msg,{cssClass:'alert-success',timeout:1000});
      else  
          this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:1000});
      this.req = this._video.list().subscribe(data=>{
      //console.log(data)
      //console.log(data);
      this.videolist = data as [any];
    })
    })
  }
  else{
    this.router.navigate(['/login']);
  }
  }

  request(id){
    const user = {
      id:id,
      email:this.email
    }
    //console.log(user);
    this.req = this._video.request(user).subscribe(data=>{
      if(data.success){
        this.flashMessage.show(data.msg,{cssClass: 'alert-success', timeout: 1000});
      }
      else{
        this.flashMessage.show(data.msg,{cssClass: 'alert-danger', timeout: 1000});
      }
    })
  }



  }







