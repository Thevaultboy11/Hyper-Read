import React from "react";
import UploadBooks from "../../component/admin/UploadBooks";
import ListPublicBooks from "../../component/admin/ListPublicBooks";
import handle_protected_routes from "../../lib/auth/handle_protected_routes";
import handle_admin_routes from "../../lib/auth/handle_admin_routes";
function Uploadbook() {
  return (
    <div className="container">
      <div className="row">
        <UploadBooks />
        <ListPublicBooks />
      </div>
    </div>
  );
}

export default Uploadbook;

export async function getServerSideProps(context: any) {
  return handle_admin_routes(context.req, context.res);
}
