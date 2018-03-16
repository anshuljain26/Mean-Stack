import { Injectable } from '@angular/core';
import {Http ,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {tokenNotExpired} from 'angular2-jwt';
const endpoint = 'assets/json/videos.json'
@Injectable()
export class AuthService {
	authtoken:any;
	user:any;


  constructor(private http:Http) { }

  RegisterUser(user){

  	let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    //console.log(user);
  	headers.append('Content-type','application/json');

  	return this.http.post('http://localhost:8080/user/register',user,{headers:headers})
  				.map(res=>res.json());
}


	authenticateUser(user){

		let headers = new Headers();

  		headers.append('Content-type','application/json');

  		return this.http.post('http://localhost:8080/user/authenticate',user,{headers:headers})
  				.map(res=>res.json());


	}


	localstoredata(token,user){

		localStorage.setItem('id_token',token);
		localStorage.setItem('use',JSON.stringify(user));

		this.authtoken = token;
		this.user = user;
	}


	loggedOut(){
		this.authtoken = null;
		this.user = null;
		localStorage.clear();

	}


	getProfile(){

		let headers = new Headers();

		this.loadtoken();	

  		headers.append('Content-type','application/json');
  		headers.append('Authorization',this.authtoken);

  		return this.http.get('http://localhost:8080/user/profile',{headers:headers})
  				.map(res=>res.json());

	}

  profile_by_username(data){
    let headers = new Headers();

    this.loadtoken();  

      headers.append('Content-type','application/json');
      headers.append('Authorization',this.authtoken); 

      //console.log(data.username)
      //console.log(data.loggedinuser)


      return this.http.get('http://localhost:8080/user/profile/info',
        {params: {id:data.id,username:data.username,loggedinuser:data.loggedinuser}})
          .map(res=>res.json())
          .catch(this.handleError);
  }

  listuser(){
    //console.log('ans');
    return this.http.get('http://localhost:8080/user/listuser')
           .map(response=>response.json())
           .catch(this.handleError);
  }






	loadtoken(){
		this.authtoken = localStorage.getItem('id_token');
	}


	loggedIn(){
		//console.log(tokenNotExpired('id_token'));
		return tokenNotExpired('id_token');
	}

		// Video Configuration

		
	list(){
  		return this.http.get("http://localhost:8080/user/videos")
  		.map(response=>response.json())
  		.catch(this.handleError)

  }


  	get(slug){
  		return this.http.get("http://localhost:8080/user/videos")
  		.map(response=>{

  		let data = response.json().filter(item=>{
  			if(item.slug==slug){
  				return item
  			}
  		})

  		if(data.length==1){
  			return data[0]
  		}
  		return {}
  	})
  	.catch(this.handleError)

  }


   search(query){
    return this.http.get("http://localhost:8080/user/videos")
    .map(response=>{
      let data = []
      let req = response.json().filter(item=>{
        if(item.name.indexOf(query)>=0){
          data.push(item);
        }
      })

      return data; 
    })
    .catch(this.handleError)
  }



   Addvideo(video){

    let headers = new Headers();
    console.log(video)

    headers.append('Content-type','application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post('http://localhost:8080/user/addVideo',video,{headers:headers})
          .map(res=>res.json())
          .catch(this.handleError)
}

  deleteVideo(id){

    return this.http.delete("http://localhost:8080/user/videos/" + id)
          .map(res=>res.json())
          .catch(this.handleError);
  }


  updateVideo(id){
    let headers = new Headers();

    headers.append('content-type','application/json');
    return this.http.put("http://localhost:8080/user/videos/" + id,{headers:headers})
          .map(res=>res.json())
          .catch(this.handleError);
  }

/*
  upload(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);
    console.log(fileToUpload)

    return this.http.post("http://localhost:8080/public", input);
}*/


likepost(content){
  let headers = new Headers();
      //const blogData = { id: id };
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  //console.log(content)

  return this.http.post("http://localhost:8080/user/video/like/",content,{headers:headers})
          .map(res=>res.json())

}

dislikepost(content){
  let headers = new Headers();
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  return this.http.post("http://localhost:8080/user/video/dislike/",content,{headers:headers})
          .map(res=>res.json())

}

videocomment(comment){
  let headers = new Headers();

  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  return this.http.post("http://localhost:8080/user/video/comment/",comment,{headers:headers})
          .map(res=>res.json())
}


location(location){

 let headers = new Headers();

  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  return this.http.post("http://localhost:8080/user/find_location/",location,{headers:headers})
         .map(res=>res.json())
         .catch(this.handleError);
}


request(data){
     let headers = new Headers();
     //console.log(data);
  headers.append('content-type','application/json');
  headers.append('Access-Control-Allow-Origin', '*');

  return this.http.post("http://localhost:8080/user/permission_request/",data,{headers:headers})
         .map(res=>res.json())
         .catch(this.handleError);
}

permitrequest(data){
     let headers = new Headers();
     //console.log(data);
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Origin', '*');

  return this.http.post("http://localhost:8080/user/permission_status/",data,{headers:headers})
         .map(res=>res.json())
         .catch(this.handleError);
  }



reditsearch(search){

    let headers = new Headers();
     //console.log(data);
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Origin', '*');

     return this.http.post("http://localhost:8080/user/redit-search/",search,{headers:headers})
         .map(res=>res.json())
         .catch(this.handleError);
  }




  history(his){

    let headers = new Headers();
     //console.log(data);
    headers.append('content-type','application/json');
    headers.append('Access-Control-Allow-Origin', '*');

     return this.http.post("http://localhost:8080/user/history/",his,{headers:headers})
         .map(res=>res.json())
         .catch(this.handleError);
  }


  record(data){

    let headers = new Headers();
     headers.append('content-type','application/json');
     headers.append('Access-Control-Allow-Origin', '*');

     return this.http.post("http://localhost:8080/user/record/",data,{headers:headers})
         .map(res=>res.json())
         .catch(this.handleError);
  }

  watchlater(watch){

    let headers = new Headers();
     headers.append('content-type','application/json');
     headers.append('Access-Control-Allow-Origin', '*');

     return this.http.post("http://localhost:8080/user/watchlater/",watch,{headers:headers})
         .map(res=>res.json())
         .catch(this.handleError);

  }

  removeWatch(data){
     let headers = new Headers();
     headers.append('content-type','application/json');
     headers.append('Access-Control-Allow-Origin', '*');

     return this.http.post("http://localhost:8080/user/removeWatch/",data,{headers:headers})
         .map(res=>res.json())
         .catch(this.handleError);
  }



  private handleError(error:any, caught:any) :any{
  	console.log(error, caught);
  }

  




}
