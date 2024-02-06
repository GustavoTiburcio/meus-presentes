import { Router } from 'express';
import multer from 'multer';
import path from 'path';

import UserController from '../app/controllers/UserController';
import LoginController from '../app/controllers/LoginController';
import ListTypesController from '../app/controllers/ListTypesController';
import GiftListControllers from '../app/controllers/GiftListControllers';
import GiftModelsController from '../app/controllers/GiftModelsController';
import GiftsController from '../app/controllers/GiftsController';

export const router = Router();

// Config multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/'); // folder to save files
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`); // FileName = timestamp + extension
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => res.send('<h1>meus-presentes API</h1>'));

//Users
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.post('/users/resetPassword', UserController.passwordUpdate);
router.delete('/users/:id', UserController.delete);

//Login
router.post('/login', LoginController.login);

//List Types
router.get('/listTypes', ListTypesController.index);

//Gift Lists
router.get('/giftLists', GiftListControllers.index);
router.get('/giftLists/:id', GiftListControllers.show);
router.post('/giftLists', GiftListControllers.store);
router.put('/giftLists/:id', GiftListControllers.update);
router.delete('/giftLists/:id', GiftListControllers.delete);

//Gift Models
router.get('/giftModels', GiftModelsController.index);
router.get('/giftModels/:id', GiftModelsController.show);
router.post('/giftModels', GiftModelsController.store);
router.put('/giftModels/:id', GiftModelsController.update);
router.delete('/giftModels/:id', GiftModelsController.delete);

//Gifts
router.get('/gifts', GiftsController.index);
router.get('/gifts/:id', GiftsController.show);
router.post('/gifts', upload.single('file'), GiftsController.store);
router.put('/gifts/:id', upload.single('file'), GiftsController.update);
router.delete('/gifts/:id', GiftsController.delete);
