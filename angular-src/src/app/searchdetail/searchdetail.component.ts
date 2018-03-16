import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-searchdetail',
  templateUrl: './searchdetail.component.html',
  styleUrls: ['./searchdetail.component.css'],
  providers:[AuthService]
})
export class SearchdetailComponent implements OnInit {


	req:any;
	routesub:any;
	query:string;
	videolist:[any];

  constructor(private routes:ActivatedRoute, private _video:AuthService) { }

  ngOnInit() {
  	this.routesub = this.routes.params.subscribe(params=>{
  		this.query = params['q'];
      this.req= this._video.search(this.query).subscribe(data=>{
        this.videolist = data as [any];
        console.log(this.videolist);

      })
  	})
  }


   ngOnDestroy(){
  	this.routesub.unsubscribe()
    this.req.unsubscribe();
  }

}
