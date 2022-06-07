


// imports
import { 
     UserType, 
     NewUser, 
     ModifyDataType 
} from "./UserType.type";


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
     GetUser: (email: string) => Promise<UserType[]>,
     GetUsers: () => Promise<PaginatedResponse>,
     CreateUser: (user: NewUser) => Promise<UserType | false>,
     DeleteUser: (email: string) => Promise<boolean>,
     ModifyUser: (email: string, details: ModifyDataType) => Promise<boolean>
}