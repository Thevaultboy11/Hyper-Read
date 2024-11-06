import React, { useState } from "react";
import LibraryForm from "../component/library/LibraryForm";
import LibraryResults from "../component/library/LibraryResults";
import handle_protected_routes from "../lib/auth/handle_protected_routes";

export default function library() {
  const [book_name, set_book_name] = useState("");
  return (
    <div className="container">
      <div className="row">
        <LibraryForm set_book_name={set_book_name} />
        <LibraryResults book_name={book_name} />
      </div>
    </div>
  );
}
export async function getServerSideProps(context: any) {
  return handle_protected_routes(context.req, context.res);
}
