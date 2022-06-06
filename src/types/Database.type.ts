


// imports
import { UserType } from "./UserType.type";


// paginator response type
export type PaginatedResponse = {
     results: any[],
     hasMore: boolean,
     totalFound: number,
     currentPage: number,
     limit: number
}


// main database type
export type DatabaseType = {
     GetUser: (email: string) => Promise<UserType>,
     GetUsers: () => Promise<PaginatedResponse>,
     CreateUser: (user: UserType) => Promise<any>,
     DeleteUser: (email: string) => Promise<any>,
     ModifyUser: (details: any) => Promise<any>
}