


export type ImageType = {
     _id: string,
     name: string,
     extension: string,
     size: number,
     createdBy: string,
     createdAt: Date,
     data: string
}

export type NewImage = {
     name: string,
     extension: string,
     size: number,
     createdBy: string,
     data: string,
}