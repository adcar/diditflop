import Search from "./Search";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Search />
      <main>{children}</main>
    </>
  );
}
