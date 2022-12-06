import { rest } from "msw";
import { users } from "../assets/data/Users";
import { texts } from "../assets/data/Texts";
import { comments } from "../assets/data/Comments";
import { SearchElements } from "../utils/SearchElements";
import bcrypt from "bcryptjs";

export const handlers = [
  rest.get(`/texts/:genre`, (req, res, ctx) => {
    const { genre } = req.params;

    if (genre === "undefined") return res(ctx.status(400));

    const textsByGenre = SearchElements.filterElementsByGenre(texts, genre);

    if (textsByGenre === undefined) return res(ctx.status(404));

    return res(ctx.status(200), ctx.json({ textsByGenre }));
  }),
  rest.get(`/text/:id`, (req, res, ctx) => {
    const { id } = req.params;

    if (id === "undefined") return res(ctx.status(400));

    const textById = SearchElements.getElementById(texts, parseInt(id));

    if (textById === undefined) return res(ctx.status(404));

    return res(
      ctx.status(200),
      ctx.json({
        textById,
      })
    );
  }),
  rest.get(`/text/profile/:username`, (req, res, ctx) => {
    const { username } = req.params;
    if (username === "undefined") return res(ctx.status(400));

    const user = SearchElements.getUserByUsername(users, username);

    if (user === undefined) return res(ctx.status(404));

    const userTexts = user.texts.map((id) => {
      return SearchElements.getElementById(texts, id);
    });

    if (userTexts === undefined) return res(ctx.status(204));

    return res(ctx.status(200), ctx.json(userTexts));
  }),
  rest.get(`/text/profile/savedTexts/:username`, (req, res, ctx) => {
    const { username } = req.params;
    if (username === "undefined") {
      return res(ctx.status(400));
    }
    const user = SearchElements.getUserByUsername(users, username);
    if (user === undefined) {
      return res(ctx.status(404));
    }
    const userSavedTexts = user.savedTexts.map((id) => {
      return SearchElements.getElementById(texts, id);
    });
    if (userSavedTexts === undefined) {
      return res(ctx.status(204));
    }
    return res(ctx.status(200), ctx.json(userSavedTexts));
  }),
  rest.get(`/user/:username`, (req, res, ctx) => {
    const { username } = req.params;

    if (username === "undefined") return res(ctx.status(400));

    const userByUsername = SearchElements.getUserByUsername(users, username);

    if (userByUsername === undefined) return res(ctx.status(404));

    return res(
      ctx.status(200),
      ctx.json({
        user: userByUsername,
      })
    );
  }),
  rest.get(`/users/:id`, (req, res, ctx) => {
    const { id } = req.params;

    if (id === "undefined") return res(ctx.status(400));

    const userById = SearchElements.getElementById(users, parseInt(id));

    if (userById === undefined) return res(ctx.status(404));

    return res(
      ctx.status(200),
      ctx.json({
        userById,
      })
    );
  }),
  rest.get(`/users/:subscriptionType/:id`, (req, res, ctx) => {
    const { subscriptionType, id } = req.params;

    if (id === undefined || subscriptionType === undefined) {
      return res(ctx.status(400));
    }
    const user = SearchElements.getElementById(users, parseInt(id));
    if (user === undefined) {
      return res(ctx.status(404));
    }

    if (subscriptionType === "followers") {
      const userFollowers = [];
      for (const item of user.followers) {
        userFollowers.push(SearchElements.getElementById(users, item));
      }
      return res(ctx.status(200), ctx.json({ userFollowers }));
    } else if (subscriptionType === "followings") {
      const userFollowings = [];
      for (const item of user.following) {
        userFollowings.push(SearchElements.getElementById(users, item));
      }
      return res(ctx.status(200), ctx.json({ userFollowings }));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.post(
    `/user/follow/:userIdWhoFollows/:userIdFollowed`,
    (req, res, ctx) => {
      const { userIdWhoFollows, userIdFollowed } = req.params;
      if (userIdWhoFollows === "undefined" || userIdFollowed === "undefined")
        return res(ctx.status(400));

      const userIdWhoFollowsParsed = parseInt(userIdWhoFollows);
      const userFollowed = SearchElements.getElementById(
        users,
        parseInt(userIdFollowed)
      );

      if (userFollowed === undefined) return res(ctx.status(404));

      if (userFollowed.followers.find((l) => l === userIdWhoFollowsParsed)) {
        userFollowed.followers = userFollowed.followers.filter(
          (l) => l !== userIdWhoFollowsParsed
        );
      } else {
        userFollowed.followers.push(parseInt(userIdWhoFollowsParsed));
      }
      return res(ctx.status(200));
    }
  ),
  rest.get(`/comments/:textId`, (req, res, ctx) => {
    const { textId } = req.params;

    if (textId === "undefined") return res(ctx.status(400));

    const parsedtextId = parseInt(textId);
    const textById = SearchElements.getElementById(texts, parsedtextId);
    if (textById === undefined) return res(ctx.status(404));
    const commentsOfThisText = textById.comments.map((comment) => {
      return SearchElements.getElementById(comments, parseInt(comment));
    });
    if (commentsOfThisText === undefined) return res(ctx.status(404));

    return res(
      ctx.status(200),
      ctx.json({
        commentsOfThisText,
      })
    );
  }),
  rest.get(`/search/:type/:element`, (req, res, ctx) => {
    const { type, element } = req.params;
    if (type === "undefined" || element === "undefined")
      return res(ctx.status(400));

    if (type === "writings" || type === "poems") {
      const textsByGenre = SearchElements.filterElementsByGenre(texts, type);
      if (textsByGenre === undefined) return res(ctx.status(404));

      const textsByTitle = SearchElements.containsTitle(textsByGenre, element);
      if (textsByTitle === undefined) return res(ctx.status(404));

      return res(ctx.status(200), ctx.json({ elements: textsByTitle }));
    } else if (type === "users") {
      const usersByUsername = SearchElements.containsUsername(users, element);
      if (usersByUsername === undefined) return res(ctx.status(404));

      return res(ctx.status(200), ctx.json({ elements: usersByUsername }));
    } else {
      return res(ctx.status(400));
    }
  }),
  rest.post(`/like/:textId/:userId`, (req, res, ctx) => {
    const { textId, userId } = req.params;
    if (textId === "undefined" || userId === "undefined")
      return res(ctx.status(400));

    const parsedUserId = parseInt(userId);

    const text = SearchElements.getElementById(texts, parseInt(textId));
    if (text === undefined) return res(ctx.status(404));

    if (text.likes.find((l) => l === parsedUserId)) {
      text.likes = text.likes.filter((l) => l !== parsedUserId);
    } else {
      text.likes.push(parseInt(parsedUserId));
    }
    return res(ctx.status(200));
  }),
  rest.post(`/save/:textId/:userId`, (req, res, ctx) => {
    const { textId, userId } = req.params;
    if (textId === "undefined" || userId === "undefined")
      return res(ctx.status(400));
    const parsedTextId = parseInt(textId);

    const user = SearchElements.getElementById(users, parseInt(userId));
    if (user === undefined) return res(ctx.status(404));
    if (user.savedTexts.find((l) => l === parsedTextId)) {
      user.savedTexts = user.savedTexts.filter((l) => l !== parsedTextId);
    } else {
      user.savedTexts.push(parseInt(parsedTextId));
    }
    return res(ctx.status(200));
  }),
  rest.post(`/comment/:textId`, (req, res, ctx) => {
    const { textId } = req.params;
    if (textId === "undefined") return res(ctx.status(400));
    const parsedTextId = parseInt(textId);
    const text = SearchElements.getElementById(texts, parsedTextId);
    if (text === undefined) return res(ctx.status(404));

    req.json().then((data) => {
      comments.push(data);
      text.comments.unshift(data.id);
    });
    return res(ctx.status(200));
  }),

  rest.post("/auth/login", async (req, res, ctx) => {
    //MWS doesn't support JWT authentication.
    //Instead we are going to use (for now) a simple random token.
    //This is going to change when we make a NodeJS server.

    //Gonza deja de tratar de simplificar el laburo a un par de líneas de código mal hechas.
    //Anda a estudiar y volvé cuando tengas idea de lo que estás haciendo.
    //PD: No te olvides de hacer el try catch.
    const { email, password } = await req.json();
    if (!email && !password) {
      return res(ctx.status(400));
    }
    const accessToken = "jwt-token";
    const user = SearchElements.getUserByEmail(users, email);
    if (user === undefined) return res(ctx.status(401, "E-mail incorrecto"));
    if (!bcrypt.compareSync(password, user.password))
      return res(ctx.status(401, "Contraseña incorrecta"));

    user.accessToken = accessToken;
    //Revisar como funciona JWT. Vamos a tener que devolver el token como respuesta
    //del servidor. Con ese token obtenemos la información del usuario después en el componente.
    //JWT in node.js server.
    return res(ctx.status(200), ctx.json(user));
  }),
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
