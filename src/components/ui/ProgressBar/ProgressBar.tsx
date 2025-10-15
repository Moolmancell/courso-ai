export function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="w-full h-2 bg-zinc-200 rounded-3xl">
            <div
              className="h-full bg-blue-500 rounded-3xl"
              style={{ width: `${progress}%` }}
              data-testid="progress-bar"
            />
        </div>
    )
}