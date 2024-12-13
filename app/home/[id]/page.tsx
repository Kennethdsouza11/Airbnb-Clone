import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

async function getData(homeid: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          src={`https://vbywagjdfoiwossjltkg.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt="Image of the home"
          fill
          className="rounded-lg h-full object-cover"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>
              {data?.guests} guests | {data?.bedrooms} bedrooms |{" "}
              {data?.bathrooms} bathrooms
            </p>
          </div>
          <div className="flex items-center mt-6">
            <img
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="profile image"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                Hosted by {data?.User?.firstName} {data?.User?.lastName}
              </h3>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
        </div>
        <SelectCalendar />
      </div>
    </div>
  );
}
