import { useGetLinks } from "@/hooks/api/useGetLinks";
import { Fragment, HTMLAttributes, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import FormMessage from "../../shared/FormMessage";
import GradientAvatar from "../GradientAvatar";
import "./LinksList.css";

const trCss = "grid grid-cols-[4rem_repeat(4,1fr)_6rem] place-items-center gap-x-4";

function LinkListItem(props: {
  link: { slug: string; longLink: string; createdAt: string; _count: { Visit: number } };
}) {
  const link = props.link;

  return (
    <tr className={`${trCss} mb-5`}>
      <td>
        <GradientAvatar className="w-16 h-16" seed={link.slug} />
      </td>
      <td className="font-bold text-lg underline text-blue-500 hover:text-blue-400 focus:text-blue-600 transition-colors duration-300">
        <a href={`${import.meta.env.VITE_API_URL}/${link.slug}`} target="_blank" rel="norefferer noopener">
          {`${import.meta.env.VITE_API_URL.split("://")[1]}/${link.slug}`}
        </a>
      </td>
      <td className="italic text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-300">
        <a href={link.longLink} target="_blank" rel="norefferer noopener">
          {link.longLink}
        </a>
      </td>
      <td>{link._count.Visit}</td>
      <td>{new Date(link.createdAt).toLocaleDateString()}</td>
      <td>
        <Link className="outline-none" to={`/track/${link.slug}`}>
          <Button className="w-full py-3">Track</Button>
        </Link>
      </td>
    </tr>
  );
}

export default function LinksList(props: HTMLAttributes<HTMLDivElement>) {
  const fixedProps = { ...props };
  delete fixedProps.className;

  const { isFetching, hasNextPage, isFetchingNextPage, fetchNextPage, status, data, error } = useGetLinks();

  if (status === "loading") {
    return (
      <div>
        <FormMessage purpose="neutral">Loading...</FormMessage>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <FormMessage purpose="error">{error?.message}</FormMessage>
      </div>
    );
  }

  return (
    <div {...fixedProps} className={`${props.className}`}>
      <table className="w-full">
        <thead>
          <tr className={`${trCss} text-neutral-600 text-sm mb-2`}>
            <th></th>
            <th>short link</th>
            <th>long link</th>
            <th>visits</th>
            <th>created</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.links.map((l) => {
                return <LinkListItem link={l} key={l.slug} />;
              })}
            </Fragment>
          ))}
        </tbody>
      </table>

      <Button
        className="w-full py-6 mt-5"
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage({ pageParam: (data?.pages.length || 0) + 1 })}
      >
        {isFetchingNextPage ? "Loading..." : hasNextPage ? "Load More" : "No More Links"}
      </Button>
    </div>
  );
}
