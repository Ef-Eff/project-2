const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const meetupSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.ObjectId, ref: 'User' },
  name: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String, default: '87bc1865-be22-4abf-aef4-4624aa4963fc.jpeg' },
  description: { type: String },
  food: { type: String },
  requirements: { type: String },
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  location: { type: String },
  lat: { type: String },
  lng: { type: String }
}, {
  timestamps: true
});

meetupSchema.pre('remove', function removeImage(next) {
  s3.deleteObject({ Key: this.image }, next);
});

meetupSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    return `https://s3-eu-west-1.amazonaws.com/wdi-london-project-2/${this.image}`;
  });

module.exports = mongoose.model('Meetup', meetupSchema);
