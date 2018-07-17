

export class User{
public USER={
    user_id:'',
    v_code:'',
    phone:'',
     lat:'',
     lng:''
    
}
public USER_TYPE;

        
    constructor(){

    }
    getuser() {
        
            
      return this.USER;
    }

    setuser(user) {
        console.log(user)
        this.USER_TYPE=user.type
        this.USER={
            user_id:user.user_id,
            v_code: user.v_code,
            phone:user.phone,
            lat : user.lat,
            lng : user.lng
            
            
        }
        // this.USER= user;
    }
}