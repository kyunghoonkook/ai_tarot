import mongoose from 'mongoose';

const TarotReadingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Major Tarot', 'Love Tarot', 'Career Tarot', 'Daily Tarot', 'Custom Tarot', 'Money Tarot', 'Health Tarot'],
    },
    question: {
      type: String,
      required: true,
    },
    cards: {
      type: [String],
      required: true,
    },
    interpretation: {
      type: String,
      required: true,
    },
    design: {
      type: String,
      enum: ['Beauty', 'Cute', 'Dark'],
      default: 'Beauty',
    },
    savedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Find readings by user ID
TarotReadingSchema.statics.findByUserId = function(userId) {
  console.log('findByUserId 메서드 호출됨:', userId);
  return this.find({ userId: userId }).sort({ createdAt: -1 });
};

// Prevent mongoose from creating a duplicate model
const TarotReading = mongoose.models.TarotReading || mongoose.model('TarotReading', TarotReadingSchema);

export default TarotReading; 