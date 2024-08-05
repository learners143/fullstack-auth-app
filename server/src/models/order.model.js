import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  }],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'UPI', 'bankTransfer', 'wallet'], // Include various payment methods
  },
  paymentDetails: {
    upiId: {
      type: String, // Field for UPI ID if the payment method is UPI
    },
    transactionId: {
      type: String, // Transaction ID for tracking payments
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['processing', 'packed', 'shipped', 'delivered'], // Enum for order statuses
    default: 'processing', // Default status
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
