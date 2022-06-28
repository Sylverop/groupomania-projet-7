const Post = require("../models/post.model");
const User = require("../models/user.model");

// CRUD post
// récupération des posts
exports.getPost = (_req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json({ err }));
};
// Création d'un post
exports.createPost = (req, res) => {
  const post = new Post({ ...req.body });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post créé" }))
    .catch((err) => res.status(400).json({ err }));
};

//Modification d'un post
exports.updatePost = (req, res) => {
  const updateMessage = {
    message: req.body.message,
  };

  Post.findByIdAndUpdate(
    req.params.id,
    { $set: updateMessage },
    { new: true },
    (err) => {
      if (!err) res.send("Post modifié");
      else console.log(err);
    }
  );
};

//Suppression d'un post
exports.deletePost = (req, res) => {
  try{
    Post.findByIdAndRemove(req.params.id, (err) => {
    if (!err) res.send("Post supprimé");
    else res.send(err);
  
  });
  }catch (err) {
    return res.status(400).send(err);
  }

};

// Ajout d'un like et enregistrement de l'utilisateur dans [likers]
exports.likePost = (req, res) => {
  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.userId },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    User.findByIdAndUpdate(
      req.body.userId,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err) => {
        if (!err) {
          res.status(200).send({message: "Post liké"});
        }
        else {
          return res.status(400).send(err);
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Retrait du like et retrait de l'utilisateur du tableau [likers]

exports.unlikePost = (req, res) => {
  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.userId },
      },
      { new: true },
      (err) => {
        return res.status(err);
      }
    );
    User.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err) => {
        if (!err) res.status(200).send({message: "Like retiré"});
        else {
          return res.status(400).send(err);
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// gestion commentaire

exports.commentPost = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            authorName: req.body.authorName,
            text: req.body.text,
            creationDate: req.body.creationDate
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send({ docs });
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.editCommentPost = (req, res) => {
  try {
    return Post.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment)
        return res.status(404).json({ message: "Commentaire non trouvé" });
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).json({ docs });
        return res.status(500).json({ err });
      });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.deleteCommentPost = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        return res.status(400).json({ err });
      }
    );
  } catch (err) {
    res.status(400).json({ err });
  }
};