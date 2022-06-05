


// image type
export type ImageType = {
     name: string,
     extension: string,
     createdAt: Date,
     size: number,
     createdBy: string,
     data: string
}


// post type
export type PostType = {
     text: string,
     createdBy: string,
     likes: number,
     likedBy: string[],
     reposts: number,
     repostedBy: string[],
     postType: 'media' | 'text',
     mediaType?: 'image',
     comments: string[],
     media?: string,
     createdAt: Date
}


// comment type
export type CommentType = {
     text: string,
     for: string,
     createdBy: string,
     comments: string[],
     createdAt: Date
}