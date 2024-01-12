import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another account
                return this.login(email, password);

            } else {
                return userAccount;
            }
            
        } catch (e) {
            throw e;
        }
    }

    async login({ email, password }) {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createEmailSession(email, password);
        } catch (e) {
            throw e;
        }
    } 

    async getCurrentUser() {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.get();
        } catch (e) {
            throw e;
        }
        // eslint-disable-next-line no-unreachable
        return null;
    }

    async logout() {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.deleteSessions();
        } catch (e) {
            throw e;
        }
    }
}

const authService= new AuthService();

export default authService;