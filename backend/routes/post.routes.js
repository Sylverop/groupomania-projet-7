const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const Auth = require ("../middleware/auth.middleware")
const multer = require("../middleware/multer-post");

// CRUD post
router.get("/", Auth, postCtrl.getPost);
router.post("/", Auth, multer, postCtrl.createPost);
router.put("/:id", Auth, multer, postCtrl.updatePost);
router.delete("/:id", Auth, postCtrl.deletePost);

//likes
router.patch("/:id/like", Auth, postCtrl.likePost);
router.patch("/:id/unlike", Auth, postCtrl.unlikePost);

//comments
router.patch("/comment-post/:id", Auth, postCtrl.commentPost);
router.patch("/comment-edit/:id", Auth, postCtrl.editCommentPost);
router.patch("/comment-delete/:id", Auth, postCtrl.deleteCommentPost);

module.exports = router