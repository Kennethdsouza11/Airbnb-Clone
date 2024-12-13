import prisma from "./lib/db";
import { MapFilterItems } from "./components/MapFilterItems";
import { ListingCard } from "./components/ListingCard";
import { Suspense } from "react";
import { SkeletonCard } from "./components/SkeletonCard";
import { NoItems } from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: { filter?: string };
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favourite: {
        where: {
          userId: userId ?? undefined, //we want to get the favourites if the user id matches with the logged in user
        },
      },
    },
  });
  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  //searchParams is the string after the ? in the URl for example if /home?filter=popular is the url then searchParams will be filter: 'popular'

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });
  return (
    <>
      {data.length === 0 ? (
        <NoItems
          description="Please check other category..."
          title="Uh Oh! No listings for this categories"
        />
      ) : (
        <div className="grid lg-grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo as string}
              description={item.description as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favouriteId={item.Favourite[0]?.id}
              isInFavouriteList={item.Favourite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            /> //key is used to tell the items apart
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg-grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
