import { TokenDto } from './token-dto.model';

export class TokenVerificationResponse {

    public tokenDto: TokenDto;
    public errorCode: number;
    public errorMessage: string;
    public status: string;

    public constructor(init?: Partial<TokenVerificationResponse>) {
        Object.assign(this, init);
    }

}
