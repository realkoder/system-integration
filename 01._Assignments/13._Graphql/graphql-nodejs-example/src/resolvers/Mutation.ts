import db from "../database/data.js";
import { ApolloError } from "apollo-server";
import pubsub from "../database/pubsubUtil.js";

interface IBookMutation {
    title: string;
    authorId: string;
    releaseYear: number;
}

function createAuthor(poarent: any, args: {name: string}, context: any, info: any) {
    const providedAuthorName = args.name;
    const nextId = db.authors[db.authors.length - 1].id + 1;

    const newAuthor = {
        id: nextId,
        name: providedAuthorName,
    }

    db.authors.push(newAuthor);

    return newAuthor
}

function createBook(parent: any, args: IBookMutation, context: any, info: any) {
    const providedAuthorId = Number(args.authorId);
    const foundAuthor = db.authors.find((author) => author.id === providedAuthorId);
    if (!foundAuthor) {
        throw new ApolloError(`Author not found with ID: ${providedAuthorId}`, 'AUTHOR_NOT_FOUND');
    }

    const nextId = db.books[db.books.length - 1].id + 1;

    const newBook = {
        id: nextId,
        title: args.title,
        releaseYear: args.releaseYear,
        authorId: providedAuthorId
    };
    db.books.push(newBook);

    pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

    return newBook;
}

function updateBook(parent: any, args: any, context: any, info: any) {
    const providedBookId = Number(args.id);
    const findIndex = db.books.findIndex((book) => book.id === providedBookId);
    if (findIndex === -1) {
        throw new ApolloError(`Book not found with ID: ${providedBookId}`, 'BOOK_NOT_FOUND');
    }

    if (args.authorId) {
        const foundAuthor = db.authors.find((author) => author.id === Number(args.authorId));
        if (!foundAuthor) {
            throw new ApolloError(`Author not found with ID: ${args.authorId}`, 'AUTHOR_NOT_FOUND');
        }
    }
    
    const foundBook = db.books[findIndex];
    const updatedBook = {
        id: foundBook.id,
        title: args.title || foundBook.title,
        releaseYear: args.releaseYear || foundBook.releaseYear,
        authorId: args.authorId || foundBook.authorId
    };
    db.books[findIndex] = updatedBook;

    return updatedBook;
}

function deleteBook(parent: any, args: any, context: any, info: any) {
    const providedBookId = Number(args.id);
    const findIndex = db.books.findIndex((book) => book.id === providedBookId);
    if (findIndex === -1) {
        throw new ApolloError(`Book not found with ID: ${providedBookId}`, 'BOOK_NOT_FOUND');
    }
    const deletedBook = db.books.find(book => book.id === providedBookId);
    
    db.books.splice(findIndex, 1);

    pubsub.publish('BOOK_DELETED', { bookDeleted: deletedBook });
    
    return {
        message: `Book with ID: ${providedBookId} deleted successfully.`
    };
}

export default {
    createAuthor,
    createBook,
    updateBook,
    deleteBook,
};