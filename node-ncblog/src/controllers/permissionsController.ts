import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { Types } from "mongoose";
import PermissionModel, { validatePermission } from "../models/permission.js";
import { makeError } from "../utils/error.js";

interface CustomResponse extends Response {
  paginatedResults?: any;
}

interface PickedPermission {
  _id: Types.ObjectId;
  name: string;
  description: string;
}

// @desc Create a permission
// @route PERMISSION /permissions
// @access Private SuperAdmin
export const createNewPermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = validatePermission(req.body);
    if (error) return next(makeError(400, error.details[0].message));

    // console.log(req.body);
    const { name, description } = req.body;

    const permission = await PermissionModel.findOne({name});
    if (permission) return next(makeError(400, "Permission already exists"));
    

    const newPermission = new PermissionModel({
      name,description
    })
   
    await newPermission.save();

    if (!newPermission) return next(makeError(400, "An error occured"));

    const pickedPermission: PickedPermission = _.pick(newPermission.toObject(), ['_id', 'name', 'description']);
    res.status(201).json({success: true, data: pickedPermission});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Get all permissions
// @route GET /permissions
// @access Private SuperAdmin
export const getAllPermissions = async (req: Request, res: Response, next: NextFunction) => {
  const customRes = res as CustomResponse;

  res.status(200).json({ success: true, data: customRes.paginatedResults});
};

// @desc Get a permissions
// @route GET /permissions/:id
// @access Private SuperAdmin
export const getPermission = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, data: { "message": "Permission requested"}});
};

// @desc Update a permissions
// @route UPDATE /permissions/:id
// @access Private SuperAdmin
export const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, data: { "message": "Permission updated"}});
};

// @desc Delete a permissions
// @route DELETE /permissions/:id
// @access Private SuperAdmin
export const deletePermission= async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, data: { "message": "Permission deleted"}});
};
