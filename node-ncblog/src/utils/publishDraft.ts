import mongoose from "mongoose";
import DraftPostModel from "../models/draftpost.js";
import PostModel from "../models/post.js";

async function publishDraft(draftPostId: mongoose.Types.ObjectId) {
  const draftPost = await DraftPostModel.findById(draftPostId);

  if (!draftPost) {
    throw new Error("Draft not found");
  }

  // create and publish post
  const publishedPost = new PostModel({
    title: draftPost.title,
    body: draftPost.body,
    img: draftPost.img,
    slug: draftPost.slug,
    postAuthorId: draftPost.postAuthorId,
    // comments: draftPost.comments,
    tags: draftPost.tags,
    category: draftPost.category,
    status: 'published',
    publishedAt: new Date(),
  });

  await publishedPost.save();
  return publishedPost;
}

async function editPublishedPost (publishedPostId: mongoose.Types.ObjectId) {
  const publishedPost = await PostModel.findById(publishedPostId);

  if (!publishedPost) {
    throw new Error("Published post not found");
  }

  // create a draft from the published post when
  // the user wants to edit the published post
  const draftPost = new DraftPostModel({
    title: publishedPost.title,
    body: publishedPost.body,
    img: publishedPost.img,
    slug: publishedPost.slug,
    postAuthorId: publishedPost.postAuthorId,
    // comments: publishedPost.comments,
    tags: publishedPost.tags,
    category: publishedPost.category,
    status: 'draft',
  });

  await draftPost.save();
  return draftPost;
}

async function updatePublishedPostFromDraft(draftId: mongoose.Types.ObjectId) {
  const draftPost = await DraftPostModel.findById(draftId);

  if (!draftPost) {
    throw new Error("Draft not found");
  }

  const publishedPost = await PostModel.findOne({ _id: draftPost._id });
  
  if (!publishedPost) {
    throw new Error("Published post not found");
  }

  // Update published post with the new data from the draft
  publishedPost.title = draftPost.title;
  publishedPost.body = draftPost.body;
  publishedPost.img = draftPost.img;
  publishedPost.tags = draftPost.tags;
  publishedPost.category = draftPost.category;
  publishedPost.publishedAt = new Date(); // Update published date

  await publishedPost.save();

  // Optionally, delete the draft if it's no longer needed
  await DraftPostModel.deleteOne({ _id: draftPost._id });

  return publishedPost;
}
