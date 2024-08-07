import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  duration: { type: Number }, // Duration in seconds
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
