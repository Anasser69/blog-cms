import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title = "", tags = false }: Props) => {
  return (
    <header className="py-14 px-4 text-center border-b dark:border-purple-900">
      <h2 className=" uppercase text-2xl mx-auto max-w-2xl font-bold">
        {title}
      </h2>
      <div className="text-xs mt-2 hover:text-purple-500">{tags && <Link href="/tag">#tags</Link>}</div>
    </header>
  );
};

export default Header;
