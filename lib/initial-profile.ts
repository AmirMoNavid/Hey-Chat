import db from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";

export const initialProfile = async () => {
  const user = await currentUser();

  let userName = user?.username;

  const Name = userName?.charAt(0).toLowerCase();

  const secondSlice = userName?.slice(1);

  

  if (!userName) {
    return null;
  }
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
      name: `${Name}${secondSlice}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
