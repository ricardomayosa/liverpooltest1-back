const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		price: {
			type: Number,
			required: true
		},
		photo: String,
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
);

module.exports = mongoose.model('Article', articleSchema);
