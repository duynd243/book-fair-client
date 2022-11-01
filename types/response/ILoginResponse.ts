import { IBaseStatusResponse } from './IBaseStatusResponse';
import { ILoginUser } from '../user/ILoginUser';

export interface ILoginResponse {
    status: IBaseStatusResponse;
    data: ILoginUser;
}
