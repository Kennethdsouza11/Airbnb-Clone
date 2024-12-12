import { createCategoryPage } from "@/app/actions";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { SelectCategory } from "@/app/components/SelectCategory";
import React from "react";

export default function StructureRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);
  return (
    //here params is passed as an argument to the StructureRoute and params must have a property called id which is of type string.
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describes your Home?
        </h2>
      </div>
      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={unwrappedParams.id} />
        <SelectCategory />
        <CreationBottomBar />
      </form>
    </>
  );
}
//we have used <form> element as its intent to collect and submit user input whereas <div> element does not do so.
