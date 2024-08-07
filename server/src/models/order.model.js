import mongoose from 'mongoose';

const DEFAULT_SHIPPING_CHARGE = 50.00; // Default shipping charge
const GST_RATE = 0.18; // GST rate of 18%

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
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
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
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
    default: DEFAULT_SHIPPING_CHARGE,
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

// Method to calculate and set prices including tax and shipping
orderSchema.methods.calculatePrices = function() {
  this.itemsPrice = this.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  this.taxPrice = this.itemsPrice * GST_RATE;
  this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice;
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
