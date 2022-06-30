class UserInfoDTO {
      constructor( userId, name, token, message, role)   {
        this.userId = userId;
        this.name = name;
        this.token = token; 
        this.message = message; 
        this.role = role;
    }
}
 
module.exports = { UserInfoDTO }
