var mongoose = require('mongoose');
mongoose.set('useUnifiedTopology',true);
mongoose.set('useFindAndModify', false);

// POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);
module.exports = Post;