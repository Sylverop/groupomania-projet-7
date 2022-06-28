export class CurrentUser {
  userId: string;
  name: string;
  token: string;
  message: string;

  constructor(userInfoDTO: any) {
    this.userId = userInfoDTO.userId;
    this.name = userInfoDTO.name;
    this.token = userInfoDTO.token;
    this.message = userInfoDTO.message;
  }
}
