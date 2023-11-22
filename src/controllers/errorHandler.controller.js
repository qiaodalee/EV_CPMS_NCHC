function NotFoundError(message) {
    this.message = message;
    this.name = "NotFoundError";
}

function NotUpdateError(message) {
    this.message = message;
    this.name = "NotUpdateError";
}

export default {
    NotFoundError,
    NotUpdateError
};
