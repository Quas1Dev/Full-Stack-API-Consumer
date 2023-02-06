export interface RandomUserData {
    name: {
        first: string;
        last: string;
    };
    email: string;
    login: {
        username: string;
    };
    registered: {
        age: number;
    };
    picture: {
        medium: string;
    };
    gender: string;
    key: string;
}

export interface RandomUserApiResponse {
    results: RandomUserData[];
}