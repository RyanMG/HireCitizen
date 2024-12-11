import { User } from "@/types/User";

export async function fetchActiveUser(userId: number):Promise<User> {
  const res:User = await fetch(`http://localhost:3030/api/user/${userId}`)
    .then((res) =>
      res.json()
    )

  return res;
}

