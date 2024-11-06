import jwt_decode from "jwt-decode";

function getUsernameFromCookie(cookie: string) {
  if (!cookie) {
    return "NN";
  }
  // const token = cookie.split(";");
  // .find((cookie: any) => cookie.trim().startsWith("session="));
  // if (!token) {
  //   return "NN";
  // }
  // const decoded =
  //   jwt_decode(token)?.user.firstName + " " + jwt_decode(token)?.user.lastName;
  console.info("token", cookie.split(";")[0]?.split("=")[1].trim());

  return "Username";
}
export default getUsernameFromCookie;
