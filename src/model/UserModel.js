var User = /** @class */ (function () {
    function User() {
        this.USER = {
            user_id: '',
            v_code: '',
            phone: '',
            lat: '',
            lng: ''
        };
    }
    User.prototype.getuser = function () {
        return this.USER;
    };
    User.prototype.setuser = function (user) {
        console.log(user);
        this.USER_TYPE = user.type;
        this.USER = {
            user_id: user.user_id,
            v_code: user.v_code,
            phone: user.phone,
            lat: user.lat,
            lng: user.lng
        };
        // this.USER= user;
    };
    return User;
}());
export { User };
//# sourceMappingURL=UserModel.js.map