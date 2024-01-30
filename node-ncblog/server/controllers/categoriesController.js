import _ from "lodash";
import Category, { validateCategory } from "../models/category.js";
import { makeError } from "../utils/responses.js";

// @desc Get all categories
// @route GET /categories
// @access Private
export const getAllCategories = async (req, res) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
};

// @desc Create a category
// @route POST /categories
// @access Private
export const createNewCategory = async (req, res, next) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) return next(makeError(400, error.details[0].message));

    // console.log(req.body);
    const { name } = req.body;
    
    let newCategory = new Category({
      name
    })
    
    newCategory = await newCategory.save();

    if (!newCategory) return next(makeError(400, "An error occured"));

    newCategory = _.pick(newCategory, ['_id', 'name']);
    res.status(201).json({success: true, data: newCategory});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Get a category
// @route GET /categories/:id
// @access Private
export const getCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) return next(makeError(400, "Category ID required"));

    const category = await Category.findById(categoryId)
    
    if (!category) return next(makeError(404, "The category with the given ID was not found"));
    
    res.status(200).json({ success: true, data: category});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Update a category
// @route PUT /categories/:id
// @access Private
export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) return next(makeError(400, "Category ID required"));

    const { error } = validateCategory(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name
      },
      { new: true}
    );
      
    if (!category) return next(makeError(400, "The category with given ID doesn't exist"));
      
    res.json({ success: true, message: `The category with ID ${category._id} is updated`});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Delete a category
// @route DELETE /categories/:id
// @access Private
export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) return next(makeError(400, "Category ID required"));
  
    const category = await Category.findByIdAndRemove(categoryId);
  
    if(!category) return next(makeError(404, "The category with given ID is not found'"));
  
    res.status(200).json({
      success: true,
      message: `The category with ID ${category._id} was deleted`
    });

  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};
