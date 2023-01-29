const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " brand required"],
      unique: [true, "category must be uniqe"],
      minlength: [3, "too shoort"],
      maxlength: [32, "too long "],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
brandSchema.post('init', (doc) => {
  setImageURL(doc);
});
// create
brandSchema.post('save', (doc) => {
  setImageURL(doc);
});
// 2- Create model
module.exports = mongoose.model('Brand', brandSchema);
