import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

function FaxWrapper({ children }: any) {
  const router = useRouter();
  const { slug, id } = router.query;
  const pageID = slug || (id ? id : 1);
  const sections = [
    { title: "Section 1", url: "1" },
    { title: "Section 2", url: "2" },
    { title: "Section 3", url: "3" },
  ];
  return (
    <>
      <div className="px-8 mx-auto py-4 max-w-6xl ">
        <div className="row w-full">
          <div className="col-span-12 md:col-span-8 xl:col-span-6 flex gap-x-4">
            {sections.map((i: any, idx: number) => {
              return (
                <Link href={`/faq/${i.url}`} key={idx}>
                  <button
                    className={`${
                      pageID - 1 == idx
                        ? "bg-primary400 text-white"
                        : "bg-white border-2 border-gray-300"
                    } min-w-max px-8 py-3 rounded-lg p1`}
                  >
                    {i.title}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {children}
    </>
  );
}

export default FaxWrapper;
