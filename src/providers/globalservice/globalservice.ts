import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation ,Geoposition} from '@ionic-native/geolocation';


/*
  Generated class for the GlobalserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalserviceProvider {
  public login_url : string = "http://admin.shl-app.com/api/login";
  public verfy_code_url : string = "http://admin.shl-app.com/api/testcode/";
  public active_code_url : string = "http://admin.shl-app.com/api/activate";
  public allService_url : string = "http://admin.shl-app.com/api/allserivces";
  public orderNW_url : string = "http://admin.shl-app.com/api/createorder";
  public orderLater_url : string = "http://admin.shl-app.com/api/orderschedul";
  public getSubservices_url : string = "http://admin.shl-app.com/api/getsubservicesrelatedmainservices";



  public ur: string = "?lang=ar";



  public loggedIn : boolean = false;
  public lat;
  public long;
  public currentPos;

  constructor(public storage: Storage,public http: HttpClient,public geolocation:Geolocation) {
    console.log('Hello GlobalserviceProvider Provider');
    console.log('Hello ');


  }
// get methods

verfy(mob){
	    return this.http.get(this.verfy_code_url+ mob);
}
getAllService(region){
  return this.http.get(this.allService_url + '/' + region + this.ur );
}
geo(){
      let options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(options).then((pos : Geoposition) => {
  console.log("resp",pos);
  this.lat = pos.coords.latitude;
  this.long = pos.coords.longitude;
        this.currentPos = pos;      
        console.log(pos);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
}
getSub(service_id){
    return this.http.get(this.getSubservices_url + '/' + service_id  + this.ur );

}








// post methods
login(data){
  let promise=new Promise((resolve,reject)=>{
    
    this.http.post(this.login_url,data).subscribe(res=>{
      console.log("login " , data);
      resolve(res)
    },e=>{
      reject(e)
    }) 
})
return promise;
}
active(data){
  let promise=new Promise((resolve,reject)=>{
    
    this.http.post(this.active_code_url,data).subscribe(res=>{
      console.log("active code " , data);
      resolve(res)
    },e=>{
      reject(e)
    }) 
})
return promise;
}
ordernw(data){
  let promise=new Promise((resolve,reject)=>{
    
    this.http.post(this.orderNW_url,data).subscribe(res=>{
      console.log("ordernw " , data);
      resolve(res)
    },e=>{
      reject(e)
    }) 
})
return promise;
}
orderSched(data){
  let promise=new Promise((resolve,reject)=>{
    
    this.http.post(this.orderLater_url,data).subscribe(res=>{
      console.log("orderSched " , data);
      resolve(res)
    },e=>{
      reject(e)
    }) 
})
return promise;
}









// storage data

storeValue(key:any,value:any):Promise<any>{
  this.loggedIn = true;
      let promise=new Promise((resolve,reject)=>{
            console.log('storage',key,value)
            this.storage.set(key,value);
             resolve(true)
       })
          return promise
    }

getStoredValue(key:string):Promise<any>{
        let promise=new Promise((resolve,reject)=>{
            this.storage.get(key).then((val) => {
                console.log('am from local storage ', val);
                resolve(val);
            }).catch((e)=>{
                console.log('storage err :',e);
            });
        });
        return promise;
    }

removeStoredKey(key:any){
        this.storage.remove(key);
    }

 logout() {
    this.loggedIn = false;
    this.storage.remove("USERKey");
    this.storage.set("USERKey", null);
  }

/* setUser(user) {

    this.loggedIn = true;
    this.storage.set("USERKey", JSON.stringify(user));
    this.user = user;
    console.log("this globalservice user : " , this.user);
  }

  getUser() {
    return this.storage.get("USERKey");
  }
*/

}
