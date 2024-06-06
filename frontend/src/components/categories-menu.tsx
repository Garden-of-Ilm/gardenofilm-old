import { Category } from "@/lib/definitions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

interface Props {
  subdirectory: string;
  categories: Category[];
}

export default function CategoriesMenu({ subdirectory, categories }: Props) {
  const router = useRouter();

  const activeCategoryName = router.query?.category || "";

  return (
    <div className="flex w-full flex-col rounded-lg border border-slate-400 bg-white px-4 pb-4 shadow-sm">
      <h2 className="mt-2.5 text-[13px] font-semibold">Categories</h2>
      <div className="mt-3.5 flex flex-wrap gap-x-2 gap-y-2.5">
        {categories.map((category: Category) => {
          return (
            <Button
              key={category._id}
              variant="outline"
              onClick={() => {
                if (activeCategoryName == category.name) {
                  router.push(`/${subdirectory}`);
                } else {
                  router.push(`/${subdirectory}?category=${category.name}`);
                }
              }}
              className={clsx(
                "h-fit cursor-pointer rounded-3xl border border-slate-400 px-3 py-1 text-xs",
                {
                  "border-[#a5c3bc] bg-[#a5c3bc] hover:bg-[#a5c3bc] hover:opacity-90":
                    activeCategoryName == category.name,
                  "bg-white text-black": activeCategoryName != category.name,
                },
              )}
            >
              {activeCategoryName == category.name && (
                <Check className="mr-1 h-3.5 w-3" />
              )}{" "}
              {category.name}
            </Button>
          );
        })}
      </div>
      {/* <ul className="mt-1 list-disc">
        {categories.map((c: Category, index: number) => {
          return (
            <li key={index} className="ml-5">
              <Link
                href={`/${subdirectory}/?page=1&category=${c.name}`}
                className={clsx("rounded px-2 py-0.5", {
                  "bg-slate-300/75": router.query.category == c.name,
                })}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}
