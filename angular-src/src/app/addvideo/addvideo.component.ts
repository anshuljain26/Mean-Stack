import { Component, OnInit, OnDestroy,ViewChild} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import {Router} from '@angular/router';
import {Http ,Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.css'],
  providers:[AuthService,ValidateService]
})
export class AddvideoComponent implements OnInit{

	name: String;
	slug: String;
	image: String;
	embed: String;
	req:any;
  userimagefile:File;
  uservideofile:File;
  username:any;

  @ViewChild('userimage') User_Image;
  @ViewChild('uservideo') User_Video;

  filesToUpload: Array<File>;
  filesToUpload2: Array<File>;

  constructor(private flashMessage:FlashMessagesService,
  				private _video:AuthService,
  					private validateService:ValidateService,
  						private router:Router,
                private http:Http) {
                this.filesToUpload = [];
                 }

  ngOnInit() {
    this._video.getProfile().subscribe(profile => {
      this.username = profile.user;
      console.log(this.username.username);
    },
    err => {
      console.log(err);
      return false;
    });
  }

   upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    const files2: Array<File> = this.filesToUpload2;
    const name: String = this.name;
    const slug: String = this.slug;

    formData.append("uploads[]", files[0], files[0]['name']);
    formData.append("uploads[]", files2[0], files2[0]['name']);
    formData.append("name", this.name);
    formData.append("slug",this.slug);
    formData.append("createdBy",this.username.username);
    let headers = new Headers();
    //console.log(user);
    headers.append('Content-type','application/json');




    //console.log(formData.get('name'))

   this.req = this.http.post('http://localhost:8080/user/upload', formData)
      .map(data => data.json())
      .subscribe(data =>{
          if(data.success){
            console.log("Video is successfully added")
           this.flashMessage.show('Video is successfully added', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/videos']);
          }
          else{
            this.flashMessage.show('Error in uploading', {cssClass: 'alert-danger', timeout: 3000});

          }
      })

  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
  }

  file2ChangeEvent(fileInput: any) {
    this.filesToUpload2 = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
  }







  /*

   onVideoSubmit(){

     const Image = this.User_Image.nativeElement;
     const Vid = this.User_Video.nativeElement;

     if(Image.files && Image.files[0]){
       this.userimagefile = Image.files[0]
     }

     const ImageFile:File = this.userimagefile

     if(Vid.files && Vid.files[0]){
       this.uservideofile = Vid.files[0]
     }

     const VideoFile:File = this.uservideofile

     */



  	/*
  	const video = {
  		name:this.name,
  		slug:this.slug,
  		image:ImageFile.name,
  		embed:VideoFile.name

  	}
    //console.log(video)

  	//console.log(video)
    if(this.validateService.validateVideofield(video) == false){
      console.log("Please Fill up all the enteries")
      //this.flashMessage.show('Please fill up all the enteries',{cssClass:'alert-danger', timeout:3000});
      return false;
    }



    this.req = this._video.Addvideo(video).subscribe(data=>{
		//console.log(data);
		if(data.success){
      console.log(data)
			//this.flashMessage.show('Video is Successfully added', 
									//{cssClass: 'alert-success', timeout: 3000});
			this.router.navigate(['/videos']);
		}

		else{
			//this.flashMessage.show('Something Went Wrong', 
									//{cssClass: 'alert-danger', timeout: 3000});
			this.router.navigate(['/addVideo']);
		}
	});


  }
  */



}

