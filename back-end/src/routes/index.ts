import { Router } from 'express';
import UserController from '../app/controllers/UserController';

export const router = Router();

router.get('/', (req, res) => res.send('API express'));

router.get('/users', UserController.index);
router.post('/users', UserController.store);