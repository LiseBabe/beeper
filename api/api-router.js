import { Router } from "express";
import bodyParser from "body-parser";
import { getUserHome } from "./use-case/get-user-home.js";
import { postBeep } from "./use-case/post-beep.js";

import { BeepNotFoundError, like, unlike } from "./use-case/like.js";

import { UsernameNotFound, getUserPageByName } from "./use-case/get-user-page.js";

import { follow, unfollow } from "./use-case/follow.js";
import { CommentNotFoundError, CommentTooLongError, addComment, editComment, removeComment } from "./use-case/comment.js"; // Import the comment use-case functions
import { authMiddleware } from "./auth/auth-middleware.js";

import { getCommentsForBeep } from "./use-case/get-beep-comments.js";

import { getUserSearch } from "./use-case/get-user-search.js";
import { getBeepSearch } from "./use-case/get-beep-search.js";


export const api = Router();

api.use(bodyParser.json());

api.use(authMiddleware);

api.get("/me", (req, res) => {
  res.json(req.user);
});

api.get("/home", async (req, res) => {
  const beeps = await getUserHome(req.user.id);

  res.json(beeps);
});

api.post("/beep", async (req, res) => {
  try {
    const postedBeep = await postBeep(req.user, req.body.content);
    res.status(201).json(postedBeep);
  } catch (e) {
    if (e instanceof BeepTooLongError) {
      res.status(400).send("Beep too long");
    } else {
      throw e;
    }
  }
});

api.get("/user/:name", async (req, res) => {
  try {
    const userPage = await getUserPageByName(req.user.id, req.params.name);
    res.status(200).json(userPage);
  } catch (e) {
    if (e instanceof UsernameNotFound) {
      res.status(400).send("User not found");
    } else {
      throw e;
    }
  }
});

api.put("/follow/:userId", async (req, res) => {
  try {
    await follow(req.user.id, req.params.userId);
    res.status(200).send();
  } catch (e) {
    if (e instanceof FolloweeDoesNotExistError) {
      res.status(400).send("User not found");
    } else {
      throw e;
    }
  }
});

api.put("/unfollow/:userId", async (req, res) => {
  try {
    await unfollow(req.user.id, req.params.userId);
    res.status(200).send();
  } catch (e) {
    if (e instanceof FolloweeDoesNotExistError) {
      res.status(400).send("User not found");
    } else {
      throw e;
    }
  }
});

api.put("/like/:beepId", async (req, res) => {
  try {
    await like(req.user.id, req.params.beepId);
    res.status(200).send();
  } catch (e) {
    if (e instanceof BeepNotFoundError) {
      res.status(400).send("Beep not found");
    } else {
      throw e;
    }
  }
});

api.put("/unlike/:beepId", async (req, res) => {
  try {
    await unlike(req.user.id, req.params.beepId);
    res.status(200).send();
  } catch (e) {
    if (e instanceof BeepNotFoundError) {
      res.status(400).send("Beep not found");
    } else {
      throw e;
    }
  }
});


api.get("/comments/:beepId", async (req, res) => {
  try {
    const comments = await getCommentsForBeep(req.params.beepId);

    res.json(comments);
  } catch (e) {
    if (e instanceof BeepNotFoundError) {
      res.status(400).send("Beep not found");
    } else {
      throw e;
    }
  }
});



api.get("/search/user/:search", async (req, res) => {
  try {
    const user = await getUserSearch(req.params.search);
    res.status(200).json(user.users.rows);
  } catch (e) {
    if (e instanceof UsernameNotFound) {
      res.status(400).send("User not found");

    } else {
      throw e;
    }
  }
});


// Route to add a comment to a beep
api.post("/add-comment/:beepId", async (req, res) => {
  try {
    const postedComment = await addComment(req.user, req.params.beepId, req.body.content);
    res.status(201).json(postedComment);
  } catch (e) {
    if (e instanceof CommentTooLongError) {
      res.status(400).send("Comment too long");
    } else {
      throw e;
    }
  }
});

// Route to edit a comment
api.put("/edit-comment/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await editComment(commentId, content);
    res.status(200).json(updatedComment);
  } catch (error) {
    if (e instanceof CommentNotFoundError) {
      res.status(404).send("Comment not found");
    } else {
      throw e;
    }
  }
});

api.get("/search/beep/:search", async (req, res) => {
  try {
    console.log(req.user.id)
    const user = await getBeepSearch(req.user.id,req.params.search);
    res.status(200).json(user.beeps.rows);
  } catch (e) {
    if (e instanceof UsernameNotFound) {
      res.status(400).send("User not found");
    } else {
      throw e;
    }
  }
});

// Route to delete a comment
api.delete("/delete-comment/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const success = await removeComment(commentId);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting comment");
  }
});