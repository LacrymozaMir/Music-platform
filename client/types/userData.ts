export interface IUserData {
    name: string
    password: string
}

export interface IResponseUser {
    name: string | undefined
    password: string | undefined
    id: string | undefined
}

export interface IResponseUserData {
    token: string
    user: IResponseUser
}

export interface IUser {
    id: string
    name: string
    token: string
}

export interface IUserList {
    id: string
    name: string
}

export interface IUserFull {
    _id: string
    name: string
    password: string
    addedTracks: any
    addedPlaylists: any
    dialogs: any
    friends: any
}