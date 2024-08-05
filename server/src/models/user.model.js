import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  addresses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  wishlistedItem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  refreshToken: {
    type: String
  }
}, {
  timestamps: true,
});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check password validity
userSchema.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password,
    this.password);
};

// Method to generate JWT
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}


userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id: this._id,

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

const User = mongoose.model('User', userSchema);

export default User;