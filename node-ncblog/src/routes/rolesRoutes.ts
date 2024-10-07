import express, { RequestHandler } from 'express';
import { deletePermission, updatePermission } from '../controllers/permissionsController.js';
import { createNewRole, getAllRoles } from '../controllers/rolesController.js';
import auth from '../middleware/auth.js';
import checkRole from '../middleware/checkRole.js';
import paginateWithPage from '../middleware/paginateWithPage.js';
import RoleModel from '../models/role.js';

const router = express.Router();

router.route('/')
  // .get(paginate(RoleModel), getAllRoles)
  .get([auth as RequestHandler, checkRole(['superadmin'])], paginateWithPage(RoleModel), getAllRoles)
  .post([auth as RequestHandler, checkRole(['superadmin'])], createNewRole)
  .put([auth as RequestHandler, checkRole(['superadmin'])], updatePermission)
  .delete([auth as RequestHandler, checkRole(['superadmin'])], deletePermission);
// 
export default router;
