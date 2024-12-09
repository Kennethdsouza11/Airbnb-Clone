"use client";
import { Button } from "@/components/ui/button";
import { categoryItems } from "../lib/categoryItems";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation"; //to get the search parameter from the url
import { useCallback } from "react";
import { stringify } from "querystring";
import { cn } from "@/lib/utils";

export function MapFilterItems() {
  const searchParams = useSearchParams(); //function to get the current search parameters from the url. Search parameters are the values that appear after the ? mark.
  const search = searchParams.get("filter"); //used to get the value of the filter parameter from the search parameters.
  const pathname = usePathname(); //used to get the path name from the search parameters the value before the ? mark.

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString()); //URLSearchParams is a JS tool that makes it easier to work with query strings. searchParams is converted to a string format.
      params.set(name, value);
      return params.toString(); //converts the params back to string again.
    },
    [searchParams]
  );
  return (
    <div className="flex  gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
          className={cn(
            search === item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-3 items-center"
          )}
        >
          <div className="relative w-6 h-6">
            <Image
              src={item.imageUrl}
              alt="Category image"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </div>
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
