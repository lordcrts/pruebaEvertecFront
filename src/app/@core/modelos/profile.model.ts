export class UserProfile {
    id: number;
    cover_photo: string;
    marital_status: number;
    siblings: boolean;
    birthday: string;
  
    constructor() {
    }
  
    setid(value) {
    }
    setcover_photo(value) {
      this.cover_photo = value
    }
  
    setmarital_status(value) {
      this.marital_status = value
    }
  
    setsiblings(value) {
      this.siblings = value
    }
  
    setbirthday(value) {
      this.birthday = value
    }
 
  }
  