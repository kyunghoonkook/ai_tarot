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
  console.log('userId 타입:', typeof userId, userId instanceof mongoose.Types.ObjectId ? 'ObjectId' : 'not ObjectId');
  
  // userId가 문자열인 경우 ObjectId로 변환
  let userIdObj;
  try {
    userIdObj = typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;
    console.log('변환된 userId:', userIdObj);
  } catch (error) {
    console.error('userId ObjectId 변환 오류:', error);
    userIdObj = userId;
  }
  
  return this.find({ userId: userIdObj }).sort({ createdAt: -1 });
};

// 추가: ID로 단일 타로 리딩 찾기
TarotReadingSchema.statics.findReadingById = function(readingId) {
  return this.findById(readingId);
};

// 방어적 코딩: 모델 중복 생성 방지
const TarotReading = mongoose.models.TarotReading || mongoose.model('TarotReading', TarotReadingSchema);

export default TarotReading; 