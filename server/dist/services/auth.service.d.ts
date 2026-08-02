export declare class AuthService {
    static register(data: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        token: string;
    }>;
    static login(data: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        token: string;
    }>;
    static getProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
    }>;
}
