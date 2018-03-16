
import {Router } from '@angular/router';
import {Http} from '@angular/http';
import {AuthService} from '../services/auth.service';
import { ElementRef, NgZone, OnInit, ViewChild,Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';





@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers:[AuthService]
})
export class LocationComponent implements OnInit {

	location:any;
	req:any;
	address_component:any;
	address:any;
	geometry:any;
	content:any;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('video') video:any;

  @ViewChild("search")
  public searchElementRef: ElementRef;


  constructor(private http:Http, private router:Router,private _video:AuthService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }


/*


ngAfterViewInit() {
  let _video=this.video.nativeElement;
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
                          .then(stream => {
                            _video.src = window.URL.createObjectURL(stream);
                            _video.play();
                          })
  }
}


*/










  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude;
    this.longitude;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.address = place.formatted_address
          this.address_component=place.address_components;
          console.log(this.address);
          console.log(this.address_component);

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }







  /*onLocationSubmit(){
  	const loca = {
  		location: this.location,
  	}

  	this.req = this._video.location(loca).subscribe(data=>{

  		this.content = data.body.results[0];

  		this.address = this.content.formatted_address

  		this.address_component = this.content.address_components

  		this.geometry =this.content.geometry

  		//console.log(data.body.results[0].formatted_address);
  		console.log(this.content);
  		
  	})
  }*/






}
