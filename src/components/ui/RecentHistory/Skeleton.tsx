export function Skeleton() {
    return (
        <div
  className="bg-[#ffffff] flex flex-row gap-4 items-start justify-start w-full animate-pulse relative overflow-hidden"
>
  <div
    className="flex flex-col gap-0 items-center justify-start self-stretch shrink-0 relative"
  >
 <div className="bg-[#d9d9d9] rounded-[50%] shrink-0 w-4 h-4 relative"></div>
 <div className="bg-zinc-200 flex-1 w-0.5 relative"></div>
  </div>
  <div
    className="pb-8 flex flex-col gap-2 items-start justify-start flex-1 relative"
  >
    <div
      className="bg-zinc-300 rounded-full self-stretch shrink-0 h-[15px] relative"
    ></div>
    <div
      className="bg-zinc-300 rounded-full self-stretch shrink-0 h-[15px] relative"
    ></div>
    <div
      className="bg-zinc-200 rounded-full self-stretch shrink-0 h-2.5 relative"
    ></div>
  </div>
</div>

    )
}