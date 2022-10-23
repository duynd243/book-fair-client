import { IBaseStatusResponse } from './IBaseStatusResponse';
import { ILoginUser } from '../user/ILoginUser';

export type ILoginResponse = {
    status: IBaseStatusResponse;
    data: ILoginUser;
};
