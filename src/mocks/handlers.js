import { rest } from "msw";
import { users } from "../assets/data/Users";
import { texts } from "../components/views/Writings/WritingsList/Texts";
import { SearchElements } from "../utils/SearchElements";

export const handlers = [
  rest.get(`/texts/:genre`, (req, res, ctx) => {
    const { genre } = req.params;
    const textsByGenre = SearchElements.filterElementsByGenre(texts, genre);
    return res(
      ctx.status(200),
      ctx.json({
        textsByGenre,
      })
    );
  }),
  rest.get(`/text/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const textById = SearchElements.getElementById(texts, parseInt(id));

    return res(
      ctx.status(200),
      ctx.json({
        textById,
      })
    );
  }),
  rest.get(`/users/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userById = SearchElements.getElementById(users, parseInt(id));
    return res(
      ctx.status(200),
      ctx.json({
        userById,
      })
    );
  }),
  rest.post(`/like/:textId/:userId`, (req, res, ctx) => {
    const { textId, userId } = req.params;
    const parsedUserId = parseInt(userId);
    const text = SearchElements.getElementById(texts, parseInt(textId));
    if (text.likes.find((l) => l === parsedUserId)) {
      text.likes = text.likes.filter((l) => l !== parsedUserId);
    } else {
      text.likes.push(parseInt(parsedUserId));
    }
    console.log(text);
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
