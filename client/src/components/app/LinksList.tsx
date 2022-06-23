import { useGetLinks } from "@/hooks/api/useGetLinks";
import { link } from "fs";
import { HTMLAttributes, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../shared/Button";
import FormMessage from "../shared/FormMessage";
import GradientAvatar from "./GradientAvatar";

const trCss = "grid grid-cols-[4rem_repeat(4,1fr)_6rem] place-items-center";

function LinkListItem(props: {
  link: { slug: string; longLink: string; createdAt: string; _count: { Visit: number } };
}) {
  const link = props.link;

  return (
    <tr className={`${trCss} mb-5`}>
      <td>
        <GradientAvatar className="w-16 h-16" seed={link.slug} />
      </td>
      <td>
        <a
          className="font-bold text-lg underline text-blue-500 hover:text-blue-400 focus:text-blue-600 transition-colors duration-300"
          href={`${import.meta.env.VITE_API_URL}/${link.slug}`}
          target="_blank"
          rel="norefferer noopener"
        >
          {`${import.meta.env.VITE_API_URL.split("://")[1]}/${link.slug}`}
        </a>
      </td>
      <td className="w-full text-ellipsis overflow-hidden text-center">
        <a
          className="italic text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-300 whitespace-nowrap text-ellipsis overflow-hidden"
          href={link.longLink}
          target="_blank"
          rel="norefferer noopener"
        >
          {link.longLink}
        </a>
      </td>
      <td>{link._count.Visit}</td>
      <td>{new Date(link.createdAt).toLocaleDateString()}</td>
      <td className="w-full">
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

  const [page, setPage] = useState(1);
  const { isLoading, isError, data: links, error } = useGetLinks(page);

  if (isLoading) {
    return (
      <div>
        <FormMessage purpose="neutral">Loading...</FormMessage>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <FormMessage purpose="error">{error?.message}</FormMessage>
      </div>
    );
  }

  return (
    <table {...fixedProps} className={`${props.className}`}>
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
        {links?.map((l) => {
          return <LinkListItem link={l} key={l.slug} />;
        })}
      </tbody>
    </table>
  );
}
