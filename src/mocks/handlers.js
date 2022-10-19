import { rest } from "msw";
import { users } from "../assets/data/Users";
import { texts } from "../assets/data/Texts";
import { comments } from "../assets/data/Comments";
import { SearchElements } from "../utils/SearchElements";

export const handlers = [
  rest.get(`/texts/:genre`, (req, res, ctx) => {
    const { genre } = req.params;
    const textsByGenre = SearchElements.filterElementsByGenre(texts, genre);
    if (textsByGenre !== undefined) {
      return res(
        ctx.status(200),
        ctx.json({
          textsByGenre,
        })
      );
    } else {
      return res(ctx.status(404));
    }
  }),
  rest.get(`/text/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (id !== "undefined") {
      const textById = SearchElements.getElementById(texts, parseInt(id));
      if (textById !== undefined) {
        return res(
          ctx.status(200),
          ctx.json({
            textById,
          })
        );
      } else {
        return res(ctx.status(404));
      }
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.get(`/users/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userById = SearchElements.getElementById(users, parseInt(id));
    if (userById !== undefined) {
      return res(
        ctx.status(200),
        ctx.json({
          userById,
        })
      );
    } else {
      return res(ctx.status(404));
    }
  }),
  rest.get(`/comments/:textId`, (req, res, ctx) => {
    const { textId } = req.params;
    const parsedtextId = parseInt(textId);
    const textById = SearchElements.getElementById(texts, parsedtextId);
    const commentsOfThisText = textById.comments.map((comment) => {
      return SearchElements.getElementById(comments, parseInt(comment));
    });
    if (commentsOfThisText !== undefined) {
      return res(
        ctx.status(200),
        ctx.json({
          commentsOfThisText,
        })
      );
    } else {
      return res(ctx.status(404));
    }
  }),
  rest.get(`/search/:type/:element`, (req, res, ctx) => {
    const { type, element } = req.params;
    if (type === "writings" || type === "poems") {
      const textsByGenre = SearchElements.filterElementsByGenre(texts, type);
      if (textsByGenre !== undefined) {
        const textsByTitle = SearchElements.containsTitle(
          textsByGenre,
          element
        );
        if (textsByTitle !== undefined) {
          return res(ctx.status(200), ctx.json({ elements: textsByTitle }));
        }
      }
    } else {
      const usersByUsername = SearchElements.containsUsername(users, element);
      if (usersByUsername !== undefined) {
        return res(ctx.status(200), ctx.json({ elements: usersByUsername }));
      }
    }
    return res(ctx.status(501));
  }),
  rest.post(`/like/:textId/:userId`, (req, res, ctx) => {
    const { textId, userId } = req.params;
    const parsedUserId = parseInt(userId);
    const text = SearchElements.getElementById(texts, parseInt(textId));
    if (text !== undefined) {
      if (text.likes.find((l) => l === parsedUserId)) {
        text.likes = text.likes.filter((l) => l !== parsedUserId);
      } else {
        text.likes.push(parseInt(parsedUserId));
      }
      console.log("Desde handler: " + text.likes);
      return res(ctx.status(200));
    }
  }),
  rest.post(`/save/:textId/:userId`, (req, res, ctx) => {
    const { textId, userId } = req.params;
    const parsedTextId = parseInt(textId);
    const user = SearchElements.getElementById(users, parseInt(userId));
    if (user !== undefined) {
      if (user.savedTexts.find((l) => l === parsedTextId)) {
        user.savedTexts = user.savedTexts.filter((l) => l !== parsedTextId);
      } else {
        user.savedTexts.push(parseInt(parsedTextId));
      }
      return res(ctx.status(200));
    } else {
      return res(ctx.status(404));
    }
  }),
  rest.post(`/comment/:textId`, (req, res, ctx) => {
    const { textId } = req.params;
    const parsedTextId = parseInt(textId);
    const text = SearchElements.getElementById(texts, parsedTextId);
    req.json().then((data) => {
      comments.push(data);
      text.comments.push(data.id);
    });
    return res(ctx.status(200));
  }),

  // rest.post("/login", (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   sessionStorage.setItem("is-authenticated", "true");
  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200)
  //   );
  // }),
  // rest.get("/user", (req, res, ctx) => {
  //   // Check if the user is authenticated in this session
  //   const isAuthenticated = sessionStorage.getItem("is-authenticated");
  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: "Not authorized",
  //       })
  //     );
  //   }
  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: "admin",
  //     })
  //   );
  // }),
];
