import express from 'express';
import {
    postUser, 
    getUser, 
    updateUser,
    deleteUser,
    getAllUsers,
    changePassword,
    resetPassword,
    getUserByEmail,
    updateUserRole,
    getUsersByRole,
    getCurrentUser,
    verifySecret,
    resetPasswordAfterSecret
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', postUser);
router.post('/verify-secret', verifySecret);
router.get('/all', getAllUsers);
router.get('/current', getCurrentUser);
router.get('/email', getUserByEmail);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/change-password', changePassword);
router.post('/reset-password', resetPassword);
router.post('/reset-password-after-secret', resetPasswordAfterSecret);
router.put('/:id/update-role', updateUserRole);
router.get('/role/:role', getUsersByRole);

export default router;
