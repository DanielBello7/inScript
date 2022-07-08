 


export type CommentType = {
   _id: string,
   text: string,
   for: string,
   createdBy: {
      _id: string,
      email: string,
      firstName: string,
      lastName: string,
      profileImg: string,
   },
   comments: string[],
   createdAt: Date
}


export type NewComment = {
   text: string,
   for: string,
   createdBy: string
}