"use client";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;

  let currentPage = isNaN(+pageString) ? 1 : +pageString; //Number(searchParams.get("page") ? searchParams.get("page") : 1) ?? 1;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  console.log({ currentPage });

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }
    if (+pageNumber <= 0) {
      return `${pathname}`;
    }
    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}>
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {allPages.map((pagina, index) => (
            <li className="page-item" key={pagina + "-" + index}>
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    "bg-blue-600 shadow-md text-white hover:text-white hover:bg-blue-800": pagina === currentPage,
                  }
                )}
                href={createPageUrl(pagina)}>
                {pagina}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}>
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
