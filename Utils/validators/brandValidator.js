const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddelware = require("../../middleWares/validatorMiddelware");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format "),
  validatorMiddelware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("too short Brand name")
    .isLength({ max: 32 })
    .withMessage("too long Brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  validatorMiddelware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format "),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddelware,
];
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format "),
  validatorMiddelware,
];
