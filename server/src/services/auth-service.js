import UserRepository from '../repositories/user-repository.js';
import TransactionManager from '../utils/transaction-manager.js';

export default class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
        this.transactionManager = new TransactionManager();
    }

    async register(userData) {
        return await this.userRepository.create(userData);
    }

    async registerWithTransaction(userData) {
        return await this.transactionManager.execute(async (client) => {
            const user = await this.userRepository.create(userData, client);
            return user;
        });
    }
}