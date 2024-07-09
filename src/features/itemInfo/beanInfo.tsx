import { BeanType } from "@/entities/item";
import { CheckIcon, CrossIcon } from "@/shared/assets/icons";
import Image from "next/image";

const BeanPropertyDescription: { [k in keyof BeanType]?: string } = {
  glutenFree: "Gluten free",
  sugarFree: "Sugar free",
  seasonal: "Seasonal",
  kosher: "Kosher",
};

export const BeanInfo = ({ item: bean }: { item: BeanType }) => {
  return (
    <div className="w-full float-start flex flex-col lp:flex-row">
      <Image
        src={bean.imageUrl}
        alt=""
        width={1280}
        height={720}
        className="w-full lp:max-w-[50%] object-contain float-left p-4"
      />
      <div className="px-4 mb-10">
        <h1 className="text-4xl pt-4 pb-1">{bean.flavorName}</h1>
        <span className="text-fg4">{bean.description}</span>
        <div className="py-1 flex justify-between">
          <div className="w-1/2">
            Ingredients:
            <ul>
              {bean.ingredients.length > 0 &&
                bean.ingredients.map((ingredient) => (
                  <li className="text-sm tb:text-xs" key={ingredient}>
                    - {ingredient}
                  </li>
                ))}
            </ul>
            {bean.ingredients.length == 0 && (
              <span className="text-xl text-fg4">Classified</span>
            )}
          </div>
          <div className="text-fg1 w-[40%]">
            <div className="py-2">
              In theese groups:
              <ul>
                {bean.groupName.map((group) => (
                  <li className="text-sm" key={group}>
                    - {group}
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-2">
              Properties:
              <ul>
                {(
                  Object.keys(
                    BeanPropertyDescription
                  ) as (keyof typeof BeanPropertyDescription)[]
                ).map((property) => (
                  <li className="text-sm flex items-center pt-1" key={property}>
                    - {BeanPropertyDescription[property]}:{" "}
                    {bean[property] ? (
                      <CheckIcon className="h-5 pl-2" />
                    ) : (
                      <CrossIcon className="h-5 pl-2" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
