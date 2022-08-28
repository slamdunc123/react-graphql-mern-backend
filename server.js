const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(port, console.log(`Server running on port ${port}`));
