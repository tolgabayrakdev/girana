import UserRepository from '../repositories/user-repository.js';

export default class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData) {
        return await this.userRepository.create(userData);
    }
}