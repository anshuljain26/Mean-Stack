import { Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AuthService]
})
export class HomeComponent implements OnInit, OnDestroy {
	req:any;
	homelist = []
	videoListDefaultImage = 'assets/images/nature/1.jpg'

  constructor(private _video:AuthService) { }

  ngOnInit() {
  	this.req = this._video.list().subscribe(data=>{
      console.log(data);
  		data.filter(item=>{
  			if(item.featured){
  				this.homelist.push(item)
  			}
  		})
  	})
  }

  ngOnDestroy(){
  	this.req.unsubscribe()
  }

}
