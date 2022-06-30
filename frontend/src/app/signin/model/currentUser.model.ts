export class CurrentUser {
  userId: string;
  name: string;
  token: string;
  message: string;
  role!: String;

  constructor(userInfoDTO: any) {
    this.userId = userInfoDTO.userId;
    this.name = userInfoDTO.name;
    this.token = userInfoDTO.token;
    this.message = userInfoDTO.message;
    this.role = userInfoDTO.role;
  }
}
