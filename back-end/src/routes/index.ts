import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import LoginController from '../app/controllers/LoginController';
import ListTypesController from '../app/controllers/ListTypesController';
import GiftListControllers from '../app/controllers/GiftListControllers';

export const router = Router();

router.get('/', (req, res) => res.send('<h1>meus-presentes API</h1>'));

//Users routes
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

//Login
router.post('/login', LoginController.login);

//List Types
router.get('/listTypes', ListTypesController.index);

//Gift List
router.get('/giftLists', GiftListControllers.index);
router.get('/giftLists/:id', GiftListControllers.show);
router.delete('/giftLists/:id', GiftListControllers.delete);