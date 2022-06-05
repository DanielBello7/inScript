


// user type
export type UserType = {
     _id: string,
     firstName: string,
     lastNme: string,
     email: string,
     password: string,
     createdAt: string,
     updatedAt: string,
     posts?: string[],
     likedPosts?: string[],
     repostedPosts?: string[],
     comments: string[],
     connections: string[],
     uploads: string[]
}