import { Component, OnInit , OnDestroy,ViewChild} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import{Router} from '@angular/router';
import {Http} from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-videodetail',
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.css'],
  providers:[AuthService]
})
export class VideodetailComponent implements OnInit, OnDestroy {

	req:any;
	routesub:any;
	slug:string;
	video:any;
  email:any;
  Comment:any;
  videoid:any;
  em:any;
  data:any;

  @ViewChild('videoPlayer') videoPlayer;

  formModel = {
        date:  new Date(),
    };
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MMM-yyyy hh:mm a',
        defaultOpen: false,
        closeOnSelect:true,
        allowEmpty:false,
        placeholder:"Watch Later"

    }

    check:any;




  constructor(private routes:ActivatedRoute, private http:Http, private _video:AuthService, private router:Router,
                private flashMessage:FlashMessagesService) { }

  ngOnInit() {


    var emailid = JSON.parse(localStorage.getItem('use')).email;
    var user = JSON.parse(localStorage.getItem('use')).username

    this.em = emailid;

    //console.log(user);
    var flag=0,flag1=0;
   
  	this.routesub = this.routes.params.subscribe(params=>{
  		this.slug = params['slug'];	
  		this.req = this._video.get(this.slug).subscribe(data=>{


        for(var i=0;i<data.staff.length;i++){
            if(data.staff[i]==emailid){
                flag=1;
                break;
            }
        }
        //console.log(data.createdBy);
        if(flag==0 && user != data.createdBy){
          this.flashMessage.show("You don't have permission to view the post",{cssClass:'alert-danger',timeout:2000});
          this.router.navigate(['/videos']);
        }

        else{

        this.video = data;
        this.videoid = this.video._id;
        //console.log(data);
      }

      if(data.createdBy == user){
            this.check=2;
      }
      else{
      for(var i=0;i<data.Watch.length;i++){
        if(this.em == data.Watch[i].user){
            flag1=1;
            break;

        }
      }

      if(flag1==1){
          this.check=1;
      }

      else{
        this.check=0;
      }
    }
    //console.log(this.check);






      }); 
  	});

     this.req = this._video.getProfile().subscribe(profile=>{

      this.email = profile.user.email;
      //console.log(this.email);

    const data = {

      slug:this.slug,
      email:this.email

    }

    //console.log(data);

   this.req = this._video.history(data).subscribe(history=>{
     console.log(history);
   });

 });
     /*
     Observable.interval(3000).subscribe(x=>{
     var fla=0;
     this.req = this._video.get(this.slug).subscribe(info=>{
       //console.log(info);
       for(var i=0;i<info.Watch.length;i++){
         //console.log("ans");
         //console.log(info.Watch[i].user);
         //console.log(this.em);
         if(info.Watch[i].user == this.em){
           if(info.Watch[i].enable ==1){
             //console.log("ans");
               fla=1;
               break;
           }
         }
       }
       //console.log(fla);
       if(fla==1){
         this.flashMessage.show("Your Watch Later request of " + this.slug +" is arrived",{cssClass:'alert-info',setTimeout:5000});
       }

     });

   });*/



  }


comment(){
  const comment = {
    email:this.email,
    comment:this.Comment,
    id:this.videoid
  }
  //console.log(comment)

  this.req = this._video.videocomment(comment).subscribe(data=>{
    console.log(data);
    this.router.navigate(["/videos/"]);
  });
  
}



onDateSelect(event){
  //console.log(event);
  const watch = {
    email:this.em,
    time:event,
    slug:this.slug
  }
  //console.log(watch);
  this.req = this._video.watchlater(watch).subscribe(watch=>{
    if(watch.success==false){
      this.flashMessage.show(watch.msg,{cssClass:'alert-danger',setTimeout:3000});
      var url = '/videos/' +this.slug;
        this.router.navigate([url]);
    }
    else{
      this.flashMessage.show(watch.msg,{cssClass:'alert-info',setTimeout:3000});
      var url = '/videos/' +this.slug;
        console.log(url);
        this.router.navigate(['/videos']);
    }
  });
    
}

playpause(){
  //console.log(event);
  this.videoPlayer.nativeElement.play();
    var flag=0;

    this.req = this._video.get(this.slug).subscribe(video=>{
      this.data = video
      //console.log(this.data);
      //console.log(this.video);

  for(var i=0;i<this.data.Watch.length;i++){
      //console.log(this.video.Watch[i].user);
      //console.log(this.em);
      if(this.data.Watch[i].user == this.em){

          if(this.data.Watch[i].enable == 1){
            //console.log("ans");
              flag=1;
              break;
          } 

      }
  }

  //console.log(flag);
  if(flag==1){
      const data = {
        email:this.em,
        slug:this.slug
      }
      this.req = this._video.removeWatch(data).subscribe(data=>{
        console.log(data);
      })
  }
});



}

  ngOnDestroy(){
    this.routesub.unsubscribe()
    this.req.unsubscribe()
  }




}
