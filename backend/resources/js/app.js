import './bootstrap';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers'; // Укажите правильный путь
import { typeDefs } from './graphql/schema'; // Укажите правильный путь
import csurf from 'csurf'; // Импортируем csurf

const app = express();

// Настройка CSRF-защиты
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// Middleware для передачи CSRF-токена в GraphQL
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // Генерируем CSRF-токен
  next();
});

// Настройка Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      req,
      res,
      csrfToken: res.locals.csrfToken, // Передаём CSRF-токен в контекст
    };
  },
});

// Подключение Apollo Server к Express
server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`GraphQL доступен по адресу http://localhost:${PORT}${server.graphqlPath}`);
});