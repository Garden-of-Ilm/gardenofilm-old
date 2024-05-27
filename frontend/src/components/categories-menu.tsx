import { Category } from "@/lib/definitions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  subdirectory: string;
  categories: Category[];
}

export default function CategoriesMenu({ subdirectory, categories }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col rounded-lg border border-slate-400 bg-white px-4 pb-4 shadow-sm">
      <h2 className="mt-3 font-semibold">Categories</h2>
      <ul className="mt-1 list-disc">
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
      </ul>
    </div>
  );
}
