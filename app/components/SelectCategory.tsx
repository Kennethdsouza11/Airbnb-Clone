"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { useState } from "react";

export function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  ); //this is array destructuring. We extract values from arrays. <string | null> means it can either hold string or null value and it
  return (
    <div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
      <input
        type="hidden"
        name="categoryName"
        value={selectedCategory as string}
      />
      {/* This is hidden from the user and is not shown in the webpage. It is likely used in a form submission process to send the selected category's value to a server or backend system.*/}
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={
              selectedCategory == item.name ? "border-primary border-2" : ""
            }
            onClick={() => setSelectedCategory(item.name)}
          >
            {" "}
            {/* used to have a card like style imported from shadcn*/}
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
                className="w-8 h-8"
              />
              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
