import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {Http} from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {

	routesub:any;
	content;
	req:any;
	slug:string;
	 filesToUpload: Array<File>;
  filesToUpload2: Array<File>;
  name: String;
	slug1: String;


  constructor(private routes:ActivatedRoute, private http:Http, private _video:AuthService ,private router:Router,
                  private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  	this.routesub = this.routes.params.subscribe(params=>{
  		this.slug = params['slug']
  		this.req = this._video.get(this.slug).subscribe(data=>{
  			this.content = data;
  
  			//console.log(this.content)
  		})


  	})

  }

   upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    const files2: Array<File> = this.filesToUpload2;
    const name: String = this.content.name;
    const slug1: String = this.content.slug;

    formData.append("uploads[]", files[0], files[0]['name']);
    formData.append("uploads[]", files2[0], files2[0]['name']);
    formData.append("name", name);
    formData.append("slug",slug1);
    formData.append("id",this.content._id);
    let headers = new Headers();
    //console.log(user);
    headers.append('Content-type','application/json');

    //console.log(files[0]['name'])
    //console.log(files2[0]['name'])
    console.log(formData.get('name'));
    console.log(formData.get('slug'));




    //console.log(this.content.name);


   this.req = this.http.put('http://localhost:8080/user/edit/upload', formData)
      .map(data => data.json())
      .subscribe(data =>{
          if(data.success){
            this.flashMessage.show('Video is successfully Updated',{cssClass: 'alert-success', timeout: 3000});
            this.router.navigate['/videos']
          }
          else{
            this.flashMessage.show('Error in uploading',{cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate['/videos']
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

}
