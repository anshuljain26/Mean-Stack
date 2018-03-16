import { Component, OnInit,ViewChild, AfterViewInit,OnDestroy } from '@angular/core';
import {AuthService} from '../services/auth.service';
import * as RecordRTC from 'recordrtc';

//let RecordRTC = require('recordrtc/RecordRTC.min');
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @ViewChild('video') video: any
  private stream: MediaStream;
  private recordRTC: any;
  private src;
  private req:any;
  email:any;

  constructor(private _video:AuthService) { }

  ngOnInit() {
  	let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;

    this.email =  JSON.parse(localStorage.getItem('use')).email;
  }


  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  errorCallback() {
    //handle error here
  }


    successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    //console.log(video.src);
    this.toggleControls();
  }


  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    var recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }


  startRecording() {
    var mediaConstraints = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }, audio: true
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints)
   .then(this.successCallback.bind(this), this.errorCallback.bind(this));


  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
  	//console.log(this.video);
  	console.log(this.video.nativeElement.currentSrc.substr(27));
  	//console.log(this.video.nativeElement.currentSrc.substr(22));
  	//this.src = this.video.nativeElement.currentSrc
  	 this.src = this.video.nativeElement.currentSrc.substr(27)+".webm"
  	//this.src = 'video.webm';
    this.recordRTC.save(this.src);

   setTimeout(()=>{

   	 var data = {
    	src:this.src,
    	email:this.email
    }
    this.req = this._video.record(data).subscribe(record=>{
    	console.log(record);
    })




   },5000); 
   
   
}
  


  
}

