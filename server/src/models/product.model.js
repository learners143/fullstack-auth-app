import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  images: [{
    type: String, // URL or path to the image
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Method to calculate average rating
productSchema.methods.calculateAverageRating = async function() {
  const reviews = await mongoose.model('Review').find({ product: this._id });
  
  if (reviews.length === 0) {
    this.averageRating = 0;
  } else {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / reviews.length;
  }
};

// Pre-save hook to update the average rating
productSchema.pre('save', async function(next) {
  await this.calculateAverageRating();
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
