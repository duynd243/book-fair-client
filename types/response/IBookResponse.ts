import { IAuthorBook } from '../joins/IAuthorBook';
import { ICategory } from '../category/ICategory';
import { IUser } from '../user/IUser';

export interface IBookResponse {
    id?: number;
    code?: string;
    categoryId?: number;
    publisherId?: number;
    issuerId?: string;
    isbn10?: string;
    isbn13?: string;
    name?: string;
    translator?: string;
    imageUrl?: string;
    price?: number;
    description?: string;
    language?: string;
    size?: string;
    unitInStock?: number;
    releasedYear?: number;
    page?: number;
    bookInCombo?: boolean;
    status?: number;
    statusName?: any;
    authorBooks?: IAuthorBook[];
    category?: ICategory;
    issuer?: IUser;
    publisher?: IUser;
}
