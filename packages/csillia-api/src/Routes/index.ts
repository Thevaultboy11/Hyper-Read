import auth from "./auth";
import register from "./register";
import upload from "./upload";
import books from "./books";
import progress from "./progress";
import status from "./status"; 
import analytics from "./analytics";
import library from "./library";

const api = (server: any) => {
	server.use("/auth/", auth);
	server.use("/register/", register);
	server.use("/upload/", upload);
	server.use("/books/", books);
	server.use("/reading-progress/", progress);
	server.use("/analytics/", analytics);
	server.use("/library/", library);
	server.use("/status/", status)
};

export default api;
