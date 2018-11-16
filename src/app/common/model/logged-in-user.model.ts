
export class LoggedInUser {

    public userId: string;
    public userName: string;
    public email: string;
    /**
     * make authType as enum;
     */
    public authType: string;
    public role: string;
    public createdDate: Date;
    public updatedDate: Date;
    public sessionToken: string;



}
