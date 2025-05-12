import pubsub from "../database/pubsubUtil.js";

const Subscription = {
    bookAdded: { subscribe: () => pubsub.asyncIterator('BOOK_ADDED') },
    bookDeleted: {subscribe: () => pubsub.asyncIterator("BOOK_DELETED")}
}

export default Subscription;