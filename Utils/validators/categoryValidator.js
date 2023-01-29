const slugify = require('slugify');
const { check } = require("express-validator");
const validatorMiddelware = require("../../middleWares/validatorMiddelware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format "),
  validatorMiddelware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category required")
    .isLength({ min: 3 })
    .withMessage("too short category name")
    .isLength({ max: 32 })
    .withMessage("too long category name"),
  validatorMiddelware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format "),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddelware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format "),
  validatorMiddelware,
];
