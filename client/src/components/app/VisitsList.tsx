import { useGetVisits } from "@/hooks/api/useGetVisits";
import { useEffect, useRef, useState, Fragment } from "react";
import { Icon } from "@iconify/react";
import downArrowIcon from "@iconify-icons/feather/chevron-down";
import ipIcon from "@iconify-icons/uil/desktop";
import calendarIcon from "@iconify-icons/uil/calender";
import browserIcon from "@iconify-icons/uil/browser";
import osIcon from "@iconify-icons/feather/hard-drive";
import Button from "../shared/Button";
import GradientAvatar from "./GradientAvatar";
import { UAParser } from "ua-parser-js";

function VisitsListItem(props: {
  visit: { id: number; createdAt: string; ip: string; userAgent: string; slug: string };
}) {
  const visit = props.visit;
  const createdAt = new Date(visit.createdAt);
  const ua = new UAParser(visit.userAgent);

  return (
    <div className="bg-gray-900 p-4 rounded-xl w-full">
      <div className="flex">
        <GradientAvatar className="h-16 w-16 min-w-[4rem] mr-4" seed={visit.ip} />

        <div className="min-h-16 flex text-gray-50 font-bold gap-6 flex-wrap">
          <div className="flex items-center justify-center text-center gap-1.5">
            <Icon className="w-6 h-6" icon={ipIcon} />
            <p>{visit.ip}</p>
          </div>

          <div className="flex items-center justify-center text-center gap-1.5">
            <Icon className="w-6 h-6" icon={calendarIcon} />
            <p>{createdAt.toLocaleString()}</p>
          </div>

          <div className="flex items-center justify-center text-center gap-1.5">
            <Icon className="w-6 h-6" icon={browserIcon} />
            <p>{ua.getBrowser().name}</p>
          </div>

          <div className="flex items-center justify-center text-center gap-1.5">
            <Icon className="w-6 h-6" icon={osIcon} />
            <p>{ua.getOS().name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VisitsList(props: { slug: string }) {
  const [open, setOpen] = useState(false);
  const { isFetching, hasNextPage, isFetchingNextPage, fetchNextPage, data, error } = useGetVisits(
    props.slug
  );

  const [listHeight, setListHeight] = useState(0);
  const measuringWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measuringWrapper.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const wrapper = entries[0];
      setListHeight(wrapper.target.clientHeight);
    });

    resizeObserver.observe(measuringWrapper.current);

    return () => {
      if (measuringWrapper.current) resizeObserver.unobserve(measuringWrapper.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        className="bg-gray-900 p-2 flex justify-center items-center rounded-xl w-full outline-none text-gray-50"
        onClick={() => setOpen(!open)}
      >
        <Icon
          className={`w-10 h-10 transform transition-transform duration-300 ${open && "rotate-180"}`}
          icon={downArrowIcon}
        />
      </button>

      <div
        className={`w-full h-0 transition-[height] duration-500 overflow-hidden`}
        style={{ height: open ? listHeight : undefined }}
      >
        <div ref={measuringWrapper} className={`flex flex-col gap-3 w-full`}>
          {data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.visits.map((v) => {
                return <VisitsListItem visit={v} key={v.id} />;
              })}
            </Fragment>
          ))}

          <Button
            className="w-full py-6"
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage({ pageParam: (data?.pages.length || 0) + 1 })}
          >
            {isFetchingNextPage ? "Loading..." : hasNextPage ? "Load More" : "No More Visits"}
          </Button>
        </div>
      </div>
    </div>
  );
}
