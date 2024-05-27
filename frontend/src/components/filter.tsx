import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

interface CheckboxItemProps {
  c: string;
  checked: boolean;
  onChange: any;
}

function CheckboxItem({ c, checked, onChange }: CheckboxItemProps) {
  return (
    <div key={c}>
      <input
        key={c}
        type="checkbox"
        name={c}
        id={c}
        value={c}
        className="mr-2 h-[1.1rem] w-[1.1rem]"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={c} className="select-none">
        {c}
      </label>
    </div>
  );
}

interface Props {
  subdirectory: string;
  categories: string[];
}

export default function Filter({ subdirectory, categories }: Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { push } = useRouter();

  const [flags, setFlags] = useState<boolean[]>(
    categories.map((category) =>
      params.has("category")
        ? params.get("category")!.split("|").includes(category)
        : false,
    ),
  );

  const [isOpen, setIsOpen] = useState<boolean>(flags.includes(true));

  function handleApply() {
    const selectedCategories = categories.filter(
      (category, index) => flags[index],
    );
    params.delete("category");
    params.set("category", selectedCategories.join("|"));
    push(`${subdirectory}/?${params.toString()}`, undefined, { scroll: false });
  }

  function handleReset() {
    setFlags(new Array(categories.length).fill(false));
    params.delete("category");
    push(`${subdirectory}/?${params.toString()}`, undefined, { scroll: false });
  }

  const handleCheckboxChange = (index: number) => {
    setFlags((curFlags) => {
      const newFlags = [...curFlags];
      newFlags[index] = !newFlags[index];
      return newFlags;
    });
  };

  return (
    <div className="mx-[16px] mx-auto rounded-lg border border-gray-400 bg-white shadow-sm md:mx-0">
      <div
        className="flex cursor-pointer select-none items-center px-[20px] pb-4 pt-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="grow text-[16.5px] font-semibold">
          Filter by category
        </div>
        <div>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="px-[20px] pb-5">
          <div className="grid w-full gap-1.5 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, index) => {
              return (
                <CheckboxItem
                  key={c}
                  c={c}
                  checked={flags[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              );
            })}
          </div>
          <div className="mt-5 space-x-3">
            <button
              onClick={() => handleApply()}
              className="rounded border border-black bg-black px-5 py-1 text-white hover:opacity-[75%]"
            >
              Apply
            </button>
            <button
              onClick={() => handleReset()}
              className="rounded border border-slate-400 bg-white px-5 py-1 hover:bg-gray-100"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
