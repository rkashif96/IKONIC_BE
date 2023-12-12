const PostService =require("../services/postService")


module.exports= class PostController {
    static async getPosts(req, res) {
        //let blogs = await Blog.find().skip(req.body.pageNumber * 5 ).limit(5).sort({title : 1})
        let posts = await PostService.getPosts(req.body.pageNumber)
        return res.status(200).json({
            success: true,
            message: 'Posts Fetched Successfully',
            data: posts,
        })
    }

    static async createPost(req, res) {
        let postData= req.body
        let post = PostService.createPost(postData)
        return res.status(201).json({
            success: true,
            message: 'Post Created Successfully',
            data: post,
        })
    }

    static async updatePost(req, res) {
        let postData= req.body
        let post = PostService.updatePost(postData, req.params.id)

        return res.status(200).json({
            success: true,
            message: 'Post Updated Successfully',
            data: post,
        })
    }

    static async deletePost(req, res) {
        let postData= req.body
        let post = PostService.deletePost( req.params.id)

        return res.status(200).json({
            success: true,
            message: 'Post Deleted Successfully',
            data: post,
        })
    }

}
