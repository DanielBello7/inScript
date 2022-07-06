


import { Request } from 'express';


export type CreatedByType = {
     email: string,
     firstName: string,
     lastName: string
}

export type ConnectionType = {
     _id: string,
     email: string,
     firstName: string,
     lastName: string,
     connections: string[]
}

// user type
export type UserType = {
     _id: string,
     firstName: string,
     profileImg?: any,
     lastName: string,
     email: string,
     password: string,
     createdAt?: string | Date,
     updatedAt?: string | Date,
     posts?: string[],
     likedPosts?: string[],
     repostedPosts?: string[],
     comments?: string[],
     connections?: string[],
     uploads?: string[]
}


// extended request interface
export interface RequestInterface extends Request {
     user?: any,
     secret?: any
}

// new user type
export type NewUser = {
     firstName: string,
     lastName: string,
     email: string,
     password: string,
}


// modify data type
export type ModifyDataType = {
     firstName?: string,
     lastName?: string,
     profileImg?: any,
}