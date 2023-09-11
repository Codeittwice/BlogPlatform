const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const Post = require("../models/post-model");

const router = new express.Router();

/// POSTS

/// CREATE POST
router.post("/posts", async (req, res) => {
  const post = new Post({
    ...req.body,
  });

  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

/// READ POSTS
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  try {
    res.status(201).send(posts);
  } catch (e) {
    res.status(400).send(e);
  }
});

/// READ POST SINGLE
router.get("/posts/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Post.findById(_id);

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

/// UPDATE POST
router.patch("/posts/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const post = await Post.findOne({ _id });

    if (!post) {
      return res.status(404).send();
    }

    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

/// DELETE POST
router.delete("/posts/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Post.findOneAndDelete({ _id });

    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
