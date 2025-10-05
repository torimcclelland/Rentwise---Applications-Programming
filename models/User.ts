
export class User{

    constructor(
        public email: string,
        public password: string,
        public isLandLord: boolean,
        public isPremiumUser: boolean,
        public properties: string[] = [],
        public id?: string,// has to be optional since we don't know what the id is when first making a user
        public firstName?: string,
        public lastName?: string,
        public displayName?: string,
    ) { }
}
