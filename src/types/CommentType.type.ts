 


export type CommentType = {
     _id: string,
     text: string,
     for: string,
     createdBy: string,
     comments: string[],
     createdAt: Date
}

export type NewComment = {
     text: string,
     for: string,
     createdBy: string
}