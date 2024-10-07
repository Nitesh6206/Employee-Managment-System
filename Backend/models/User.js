const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Password hashing before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        console.log('Password not modified, skipping hashing.');
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log('Hashed Password:', this.password);
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    console.log('Entered Password:', enteredPassword);
    console.log('Stored Hashed Password:', this.password);
    
    try {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        console.log('Passwords Match:', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
};

module.exports = mongoose.model('User', userSchema);
