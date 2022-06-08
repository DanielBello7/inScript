


// post type
export type PostType = {
     _id: string,
     text?: string,
     createdBy: string,
     likes: number,
     likedBy: string[],
     reposts: number,
     repostedBy: string[],
     postType: 'text' | 'media',
     mediaType?: 'image' | 'video' | 'audio',
     comments?: string[],
     media?: string,
     createdAt: Date
}


// new post type
export type NewPostType = {
     text?: string,
     createdBy: string,
     likes: number,
     reposts: number,
     postType: 'text' | 'media',
     mediaType?: 'image' | 'video' | 'audio',
     media?: string
}