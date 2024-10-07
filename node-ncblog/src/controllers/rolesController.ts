import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import mongoose from "mongoose";
import RoleModel, { validateRole } from "../models/role.js";
import { makeError } from "../utils/error.js";

interface CustomResponse extends Response {
  paginatedResults?: any;
}

interface PickedRole {
  _id: string;
  name: string;
  description: string;
  permissions: mongoose.Types.ObjectId[];
}

// @desc Get all roles
// @route GET /roles
// @access Private SuperAdmin
export const getAllRoles = async (req: Request, res: CustomResponse, next: NextFunction) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
};

// @desc Create a role
// @route ROLE /roles
// @access Private SuperAdmin
export const createNewRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = validateRole(req.body);
    if (error) return next(makeError(400, error.details[0].message));

    // console.log(req.body);
    const { name, description, permissions } = req.body;

    const role = await RoleModel.findOne({name});
    if (role) return next(makeError(400, "Role already exists"));
    

    const newRole = new RoleModel({
      name,description, permissions
    })
   
    await newRole.save();

    if (!newRole) return next(makeError(400, "An error occured"));

    const pickedRole: PickedRole = _.pick(newRole.toObject(), ['_id', 'name', 'description', 'permissions']);
    res.status(201).json({success: true, data: pickedRole});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Get a role
// @route GET /roles/:id
// @access Private SuperAdmin
export const getRole = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, data: { "message": "Role requested"}});
};

// @desc Update a roles
// @route UPDATE /roles/:id
// @access Private SuperAdmin
export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, data: { "message": "Role updated"}});
};

// @desc Delete a roles
// @route DELETE /roles/:id
// @access Private SuperAdmin
export const deleteRole= async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, data: { "message": "Role deleted"}});
};
