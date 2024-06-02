import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import db from '@/lib/db';


/**
 * This initial profile util Returns the current loggedin user, thats it.
 * It handles almost all the edge cases
 * @returns Profile object
 */


export const initialProfile = async () => {
  const user = await currentUser();

  const username =
    user?.username.charAt(0).toUpperCase() + user?.username.slice(1);
  if (!user) {
    return null;
  }
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: username,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
