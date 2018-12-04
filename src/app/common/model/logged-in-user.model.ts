import { AccountFlag } from './account-flag';

export class LoggedInUser {

    public userId: string;
    public userName: string;
    public email: string;

    /**
     * make authType as enum;
     */
    public authType: string;

    public accountFlag: AccountFlag;
    public firstName: string;
    public lastName: string;
    public name: string;

    public profilePicture: string;

    public role: string[];
    public createdDate: Date;
    public updatedDate: Date;
    public sessionToken: string;



}
