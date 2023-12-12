const Post= require("../models/postModel");


module.exports= class PostService {

    static async getPosts(pageNumber) {
        const posts = await Post.find().skip(pageNumber * 5).limit(5).sort({ title: 1 })
        if (posts) {
            return posts
        }
    }

    static async createPost(postData) {
        let post = await Post.create({
            title: postData.title,
            content: postData.content,
            Author: postData.Author
        })
        if (post) return post
    }

    static async updatePost(postData, id) {
        const updatedPost = await Post.findByIdAndUpdate(id, {
            title: postData.title,
            content: postData.content,
            author: postData.author, 
        }, { new: true });

        if (updatedPost) {
            return updatedPost;
        } 
        else {
            throw new Error("Post not found");
        }
    }


    static async deletePost(id) {
        console.log(id, 'id')
        const deletedPost = await Post.findByIdAndDelete(id);
        if (deletedPost) {
            return deletedPost;
        } else {
            throw new Error("Post not found");
        }
    }
}