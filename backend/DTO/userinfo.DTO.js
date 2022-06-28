class UserInfoDTO {
      constructor( userId, name, token, message)   {
        this.userId = userId;
        this.name = name;
        this.token = token; 
        this.message = message;
    }
}
 
module.exports = { UserInfoDTO }
