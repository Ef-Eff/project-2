const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const meetupSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.ObjectId, ref: 'User' },
  name: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String },
  description: { type: String },
  food: { type: String },
  requirements: { type: String },
  maxUsers: { type: Number },
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  location: { type: String },
  lat: { type: String },
  lng: { type: String }
}, {
  timestamps: true
});



meetupSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if (!this.image) return 'https://s3-eu-west-1.amazonaws.com/wdi-london-project-2/StockMeetupImg.jpg';
    return `https://s3-eu-west-1.amazonaws.com/wdi-london-project-2/${this.image}`;
  });

meetupSchema.pre('remove', function removeImage(next) {

  if(this.imageSRC) s3.deleteObject({ Key: this.image }, next);
  if(this.imageSRC === 'https://s3-eu-west-1.amazonaws.com/wdi-london-project-2/StockMeetupImg.jpg') next();
  next();
});

meetupSchema.methods.usersRemaining = function usersRemaining() {
  return this.maxUsers - this.attendees.length;
};

module.exports = mongoose.model('Meetup', meetupSchema);
