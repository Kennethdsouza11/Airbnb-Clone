"use client";

import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { createLocation } from "@/app/actions";
import React from "react";

export default function AddressRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = useState("");

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);

  // const LazyMap = dynamic(() => import("@/app/components/Map"), {
  //   ssr: false,
  //   loading: () => <Skeleton className="h-[50vh] w-full" />,
  // });

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl tracking-tight transition-colors mb-10 font-semibold">
          Where is your Home located?
        </h2>
      </div>
      <form action={createLocation}>
        {/* Use unwrapped params */}
        <input type="hidden" name="homeId" value={unwrappedParams.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* <LazyMap locationValue={locationValue} /> */}
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
