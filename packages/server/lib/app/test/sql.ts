import { User } from "@mkboard/database";

export async function findUser(id: number | string) {
  let user = null;
  switch (typeof id) {
    case "number":
      user = await User.findById(id);
      break;
    case "string":
      user = await User.findByEmail(id);
      break;
  }
  if (user == null) {
    throw new Error(`Unknown user id '${id}'`);
  }
  return user;
}
