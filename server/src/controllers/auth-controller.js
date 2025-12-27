import AuthService from '../services/auth-service.js';

export default class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async register(req, res, next) {
        try {
            const userData = req.body;
            const result = await this.authService.register(userData);
            res.status(201).json({ 
                success: true, 
                data: result,
                message: result.message 
            });
        } catch (error) {
            next(error);
        }
    }
}