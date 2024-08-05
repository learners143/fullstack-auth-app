import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['card', 'UPI', 'bankTransfer', 'wallet'], // Added UPI as a type
  },
  provider: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String, // Can be used for card number, bank account number, etc.
  },
  upiId: {
    type: String, // Specific field for UPI ID
  },
  expiryDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;