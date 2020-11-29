import { UserProfile } from './profile.model';

export class User {
        id: number;
        username: string;
        password: string;
        first_name: boolean;
        last_name: string;
        userprofile: UserProfile;

        constructor() {
        }

        setid(value) {
                this.id = value
        }

        setusername(value) {
                this.username = value
        }

        setpassword(value) {
                this.password = value
        }

        setfirst_name(value) {
                this.first_name = value
        }

        setlast_name(value) {
                this.last_name = value
        }

        setuserprofile(value) {
                this.userprofile = value
        }

}


