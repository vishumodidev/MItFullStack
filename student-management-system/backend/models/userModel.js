import mongoose from 'mongoose';

/**
 * User Schema defines the structure and validation rules for User documents in MongoDB.
 * Required fields: name, email, password.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true, // Prevents duplicate registrations with the same email
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    }
  },
  {
    timestamps: true // Automatically creates createdAt and updatedAt fields
  }
);

// Create and export the User model based on userSchema
const User = mongoose.model('User', userSchema);
export default User;
