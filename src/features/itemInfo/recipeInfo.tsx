import { RecipeType } from "@/entities/item";
import { CheckIcon, CrossIcon } from "@/shared/assets/icons";
import Image from "next/image";

const RecipePropertyDescription: { [k in keyof RecipeType]?: string } = {
  prepTime: "Prepare time",
  cookTime: "Cook time",
  totalTime: "Total time",
};
const RecipeIngredientsDescription: { [k in keyof RecipeType]?: string } = {
  ingredients: "Ingredients",
  additions1: "Additional ingredients",
  additions2: "Optional additives",
  additions3: "You can add these products",
};
const RecipeСookingDescription: { [k in keyof RecipeType]?: string } = {
  directions: "Directions",
  tips: "Tips",
};

export const RecipeInfo = ({ item: recipe }: { item: RecipeType }) => {
  return (
    <div className="w-full flex flex-col lp:flex-row mb-10 px-4">
      <Image
        src={recipe.imageUrl}
        alt=""
        width={1280}
        height={720}
        className="w-full lp:max-w-[50%] object-cover rounded-lg mt-4"
      />
      <div className="lp:pl-4 text-fg1">
        <h1 className="text-4xl pt-4 pb-1">{recipe.name}</h1>
        <span className="text-fg4">{recipe.description}</span>
        <div className="py-1 flex flex-col-reverse tb:flex-row tb:justify-between">
          <div className="w-full tb:w-[60%]">
            {(
              Object.keys(
                RecipeСookingDescription
              ) as (keyof typeof RecipeСookingDescription)[]
            ).map((property) => (
              <div key={property} className="pt-1">
                {(recipe[property] as string[]).length > 0 &&
                  RecipeСookingDescription[property] + ":"}
                <ul>
                  {(recipe[property] as string[]).length > 0 &&
                    (recipe[property] as string[]).map((ingredient) => (
                      <li className="text-sm tb:text-xs" key={ingredient}>
                        - {ingredient}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <div className=" w-full tb:w-[35%]">
            <div className="py-2">
              How long does it take:
              <ul>
                {(
                  Object.keys(
                    RecipePropertyDescription
                  ) as (keyof typeof RecipePropertyDescription)[]
                ).map((property) => (
                  <li className="text-sm flex items-center" key={property}>
                    {`- ${RecipePropertyDescription[property]}: ${recipe[property]}`}
                    {recipe[property] == "" && (
                      <span className="text-fg4 pl-1">Classified</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-2">
              {(
                Object.keys(
                  RecipeIngredientsDescription
                ) as (keyof typeof RecipeIngredientsDescription)[]
              ).map((property) => (
                <span key={property}>
                  {(recipe[property] as string[]).length > 0 &&
                    RecipeIngredientsDescription[property] + ":"}
                  <ul>
                    {(recipe[property] as string[]).length > 0 &&
                      (recipe[property] as string[]).map((ingredient) => (
                        <li className="text-sm tb:text-xs" key={ingredient}>
                          - {ingredient}
                        </li>
                      ))}
                  </ul>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
