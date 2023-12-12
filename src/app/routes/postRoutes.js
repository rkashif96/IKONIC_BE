const express = require ('express')
const PostController = require ('../controllers/postController')
const isAuthenticated = require("../middlewares/authMiddleware")
const { validatePost } = require("../middlewares/validationMiddleware")
let router = express.Router()
const  myAsyncHandler = require('../utils/asyncHandler')



router.route('/').get(myAsyncHandler(isAuthenticated), myAsyncHandler(PostController.getPosts)).post(myAsyncHandler(isAuthenticated), myAsyncHandler(validatePost), myAsyncHandler(PostController.createPost))
router.route('/:id').put(myAsyncHandler(isAuthenticated), myAsyncHandler(validatePost), myAsyncHandler(PostController.updatePost)).delete(myAsyncHandler(isAuthenticated), myAsyncHandler(PostController.deletePost))


module.exports = router