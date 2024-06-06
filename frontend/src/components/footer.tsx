import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-300 py-8">
      <div className="mx-auto flex max-w-7xl items-center px-[16px] md:px-[72px]">
        <div className="text-sm text-[#5c707a]">© 2024 Garden of Ilm</div>
        <div className="grow"></div>
        <div className="flex items-center justify-center space-x-4">
          <Link
            href="https://www.youtube.com/@gardenofilm"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/youtube-icon.png"
              className="h-4 w-auto"
              height="16"
              width="32"
              alt="YouTube icon"
            />
          </Link>
          <Link href="https://x.com/Alhaqqan90" target="_blank" rel="noopener">
            <Image
              src="/x-logo.png"
              className="h-4 w-auto"
              height="16"
              width="32"
              alt="X logo"
            />
          </Link>
          <Link
            href="https://chat.whatsapp.com/BV26FaxJPTiBdRlTg4tQZh"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/whatsapp-logo.svg"
              className="h-4 w-auto"
              height="16"
              width="32"
              alt="WhatsApp logo"
            />
          </Link>
          <Link
            href="https://t.me/Gardenofilm22"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/telegram-logo.png"
              className="h-4 w-auto"
              height="16"
              width="32"
              alt="Telegram logo"
            />
          </Link>
          <Link
            href="https://linktr.ee/gardenofilm"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/linktree-logo.svg"
              className="h-4 w-auto"
              height="16"
              width="32"
              alt="Linktree logo"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
