export class User {
  constructor(public userId:string='',public email:string,public dateOfBirth:Date,public country:string,
    public postalCode:string,public password:string,public userName:string){}
}
