import { useRef } from "react";

import { PopoverClose } from "@radix-ui/react-popover";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import LinkIcon from "@/icons/link";

export default function ShareButton() {
  const popoverCloseButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-fit w-fit rounded-2xl border-slate-400 px-3 py-1 text-xs md:px-3 md:text-sm"
          onClick={async () => {
            await navigator.clipboard.writeText(location.href);
            setTimeout(() => {
              popoverCloseButtonRef.current?.click();
            }, 1000);
          }}
        >
          <LinkIcon className="mr-1.5 h-4 w-4" /> Share
        </Button>
      </PopoverTrigger>

      <PopoverContent className="h-fit w-fit border-slate-300 px-2 py-1 text-sm">
        Link copied
        <PopoverClose asChild>
          <button className="hidden" ref={popoverCloseButtonRef}></button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
