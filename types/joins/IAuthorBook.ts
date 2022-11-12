import { IAuthor } from '../author/IAuthor';

export interface IAuthorBook {
    id?: number;
    bookId?: number;
    authorId?: number;
    author?: IAuthor;
}
