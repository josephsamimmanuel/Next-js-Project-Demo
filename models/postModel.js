import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }});

postSchema.virtual('shortDescription').get(function() {
    return this.description.substring(0, 120) + '...';
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;

