import { Router } from 'express';
import { getUsers } from '../controllers/userController';
import { register, login, resetPassword, updatePassword, forgotPassword } from '../controllers/authController';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';
import { getDashboardStats } from '../controllers/dashboardController';
import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection
} from '../controllers/collectionController';
import {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase
} from '../controllers/purchaseController';
import {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice
} from '../controllers/deviceController';
import {
  getEcoPointsHistory,
  createEcoPointsHistory,
  updateEcoPointsHistory,
  deleteEcoPointsHistory
} from '../controllers/ecoPointsHistoryController';
import { createSolicitud, getSolicitudes } from '../controllers/solicitudController';
import { getAllAchievements, getUserAchievements } from '../controllers/achievementController';

const router = Router();

// Auth endpoints
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.post('/auth/update-password', updatePassword);

// Dashboard endpoint
router.get('/dashboard/stats', authenticateToken, getDashboardStats);

router.get('/', (req, res) => {
  res.json({ message: 'Eco-backend API funcionando' });
});

// Ruta para obtener usuarios desde la base de datos
router.get('/users', authenticateToken, getUsers);

// Collections CRUD
router.get('/collections', authenticateToken, getCollections);
router.post('/collections', authenticateToken, authorizeRole('admin'), createCollection);
router.put('/collections/:id', authenticateToken, authorizeRole('admin'), updateCollection);
router.delete('/collections/:id', authenticateToken, authorizeRole('admin'), deleteCollection);

// Purchases CRUD
router.get('/purchases', authenticateToken, getPurchases);
router.post('/purchases', authenticateToken, createPurchase);
router.put('/purchases/:id', authenticateToken, updatePurchase);
router.delete('/purchases/:id', authenticateToken, deletePurchase);

// Devices CRUD
router.get('/devices', authenticateToken, getDevices);
router.post('/devices', authenticateToken, createDevice);
router.put('/devices/:id', authenticateToken, updateDevice);
router.delete('/devices/:id', authenticateToken, deleteDevice);

// EcoPointsHistory CRUD
router.get('/eco-points-history', authenticateToken, getEcoPointsHistory);
router.post('/eco-points-history', authenticateToken, createEcoPointsHistory);
router.put('/eco-points-history/:id', authenticateToken, updateEcoPointsHistory);
router.delete('/eco-points-history/:id', authenticateToken, deleteEcoPointsHistory);

// Solicitudes endpoints
router.post('/solicitudes', createSolicitud);
router.get('/solicitudes', getSolicitudes);

// Achievements endpoints
router.get('/achievements', getAllAchievements);
router.get('/users/:id/achievements', getUserAchievements);

export default router;
