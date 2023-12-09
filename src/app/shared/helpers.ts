export enum Role {
    User='User',
    Admin='Admin'
}

export interface User {
    id: number,
    firstName?: String,
    lastName?: String,
    username: String,
    role: Role,
    // imageUrl: String,
    imageData: string,
    accessToken?: String,
    refreshToken?: String;
}