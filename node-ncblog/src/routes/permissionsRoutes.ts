import express, { RequestHandler } from 'express';
import { getAllPermissions } from '../controllers/permissionsController.js';
import auth from '../middleware/auth.js';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();

router.route('/')
  .get([auth as RequestHandler], getAllPermissions);
  // .get([auth as RequestHandler, checkRole(['superadmin'])], getAllPermissions);

export default router;
