import express from 'express';
import { deletePermission, updatePermission } from '../controllers/permissionsController.js';
import { createNewRole, getAllRoles } from '../controllers/rolesController.js';
import paginate from '../middleware/paginateWithPage.js';
import RoleModel from '../models/role.js';

const router = express.Router();

router.route('/')
  .get(paginate(RoleModel), getAllRoles)
  // .get([auth as RequestHandler, checkRole(['superadmin'])], getAllRoles);
  .post(createNewRole)
  .put(updatePermission)
  .delete(deletePermission)
// 
export default router;
