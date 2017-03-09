const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const pics = ['6d822ca4-135a-4db6-8ace-de22495f885c.jpeg', 'a659a4fb-84c9-406d-876a-08dfc86cac70.gif', 'df31f29b-ee7b-4c4f-9a70-6baec1c17a29.png'];
const s3 = require('../lib/s3');
function math() {
  const maths = Math.floor(Math.random() * pics.length);
  return pics[maths];
}

const pmSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  sentBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  profilePic: { type: String },
  location: { type: String },
  messages: [ pmSchema ],
  lat: { type: String },
  lng: { type: String }
});

userSchema.pre('remove', function removeImage(next) {
  s3.deleteObject({ Key: this.profilePic }, next);
});

userSchema
  .virtual('profilePicSRC')
  .get(function getImageSRC() {
    return `https://s3-eu-west-1.amazonaws.com/wdi-london-project-2/${this.profilePic}`;
  });

userSchema // Virtual so we do not store it in a database, it is a new parameter in the model
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// lifecycle hook - mongoose middleware
userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  this.profilePic = math();
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema); // Storing it as db.User in the db (or db.users or some shit)
