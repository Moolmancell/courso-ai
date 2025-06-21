export function Skeleton({ id }: { id: number }) {
  return (
    <div
      className="z-0 bg-white rounded-3xl p-4 flex flex-col items-start justify-between h-64 relative overflow-hidden border border-zinc-300"
    >
      <div className="flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative">
        <div className="flex flex-row gap-4 items-center justify-start shrink-0 relative">
          <div className="bg-zinc-200 animate-pulse rounded-full shrink-0 w-9 h-9 relative" />
          <div className="bg-zinc-200 animate-pulse rounded-full shrink-0 w-[100px] h-5 relative" />
        </div>
        <div className="flex flex-col gap-[27px] items-start justify-start self-stretch shrink-0 relative">
          <div className="flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative">
            <div className="flex flex-col gap-3 items-start justify-start self-stretch shrink-0 relative">
              <div className="bg-zinc-300 animate-pulse rounded-full self-stretch shrink-0 h-5 relative" />
              <div className="bg-zinc-300 animate-pulse rounded-full self-stretch shrink-0 h-5 relative" />
            </div>
          </div>
          <div className="flex flex-col gap-3 items-start justify-start self-stretch shrink-0 relative overflow-hidden">
            <div className="bg-zinc-300 animate-pulse rounded-full self-stretch shrink-0 h-2 relative" />
            <div className="bg-zinc-300 animate-pulse rounded-3xl shrink-0 w-[100px] h-3.5 relative" />
          </div>
        </div>
      </div>
      <div className="bg-zinc-200 animate-pulse rounded-3xl shrink-0 w-[100px] h-[26px] relative" />
    </div>
  )
}
