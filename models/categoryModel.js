const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " category required"],
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
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
categorySchema.post('init', (doc) => {
  setImageURL(doc);
});
// create
categorySchema.post('save', (doc) => {
  setImageURL(doc);
});


// create modal
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
