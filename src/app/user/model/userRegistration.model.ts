
export class UserRegistration {

    public user_name: string;
    public first_name: string;
    public last_name: string;
    public email_address: string;
    public password: string;
    public confirm_password: string;
    public auth_type: string;

    // implement below in other places as well. Gather more information on Partial
    public constructor(init?: Partial<UserRegistration>) {
        Object.assign(this, init);
    }

    // constructor(user_name: string,
    //     first_name: string,
    //     last_name: string,
    //     email_address: string,
    //     password: string,
    //     confirm_password: string) {

    //     this.user_name = user_name;
    //     this.first_name = first_name;
    //     this.last_name = last_name;
    //     this.email_address = email_address;
    //     this.password = password;
    //     this.confirm_password = confirm_password;
    // }

    get userName() {
        return this.user_name;
    }

    set userName(user_name: string) {
        this.user_name = user_name;
    }

    get firstName() {
        return this.first_name;
    }

    set firstName(first_name: string) {
        this.first_name = first_name;
    }

    get lastName() {
        return this.last_name;
    }

    set lastName(last_name: string) {
        this.last_name = last_name;
    }

    get emailAddress() {
        return this.email_address;
    }

    set emailAddress(email_address: string) {
        this.email_address = email_address;
    }

    get Password() {
        return this.password;
    }

    set Password(password: string) {
        this.password = password;
    }

    get confirmPassword() {
        return this.confirm_password;
    }

    set confirmPassword(confirm_password: string) {
        this.confirm_password = confirm_password;
    }


}
