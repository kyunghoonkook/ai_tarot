import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: { 
    type: String, 
    required: [true, '이름은 필수입니다'],
    trim: true,
  },
  email: { 
    type: String, 
    required: [true, '이메일은 필수입니다'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, '유효한 이메일을 입력해주세요'],
  },
  password: { 
    type: String, 
    required: [true, '비밀번호는 필수입니다'],
    minlength: [8, '비밀번호는 최소 8자 이상이어야 합니다'],
    select: false,
  },
  image: { 
    type: String,
    default: null,
  },
  profileImage: {
    type: String,
    default: null,
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  readingsCount: {
    type: Number,
    default: 0,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  location: { 
    type: String 
  },
  tarotReadings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TarotReading'
  }],
  blogPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true,
});

// 비밀번호 해싱
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 이미 모델이 있으면 그것을 사용하고, 없으면 새로 생성합니다
const User = models.User || model('User', userSchema);

export default User; 