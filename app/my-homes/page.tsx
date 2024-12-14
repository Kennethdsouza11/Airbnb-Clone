import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItems";
import { ListingCard } from "../components/ListingCard";
import { unstable_noStore as NoStore } from "next/cache";
async function getData(userId: string) {
  NoStore();
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favourite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function MyHomes() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  const data = await getData(user.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      {data.length === 0 ? (
        <NoItems
          description="Please List a Home to view them here"
          title="Uh Oh! No Homes Listed yet"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              homeId={item.id}
              price={item.price as number}
              location={item.country as string}
              userId={user.id}
              pathName="/my-homes"
              favouriteId={item.Favourite[0]?.id}
              isInFavouriteList={item.Favourite.length > 0 ? true : false}
            />
          ))}
        </div>
      )}
    </section>
  );
}
