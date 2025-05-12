import db from "../database/data.js";

// book resolver for graphql -> resolvers resolve the value of a field in a schema
const Book = {
    author: (parent: any, args: any, context: any, info: any) => {
        const foundAuthor = db.authors.find((author) => author.id === parent.authorId);
        return foundAuthor
    }
};

export default Book;