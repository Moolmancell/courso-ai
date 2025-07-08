import { XMarkIcon } from "@heroicons/react/24/outline"
import { PlusIcon } from "@heroicons/react/20/solid"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

export function CreateCourseForm({ onCancel }: { onCancel: Function }) {
    return (
        <div className="fixed top-0 z-50 left-0 w-full h-full bg-black/50 flex items-center justify-center px-4">
            <form action="" className="bg-white border border-zinc-300 rounded-3xl p-4 flex flex-col gap-8 dialog-popout">
                <div className="flex flex-row justify-between">
                    <h1 className="font-bold text-xl">Create Course</h1>
                    <button type="button" className="cursor-pointer" onClick={() => onCancel()}>
                        <XMarkIcon className="size-6" />
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="topic" className="text-sm font-medium">Topic</label>
                        <input type="text" id="topic" name="topic" placeholder="What do you want to learn?"
                            className="bg-white py-3 px-4 rounded-3xl border border-zinc-300
                                placeholder-zinc-700 text-sm font-normal w-full"
                        />
                    </div>
                    <div className="bg-zinc-100 rounded-3xl px-3 py-4 border border-zinc-300 flex flex-row gap-4 items-center">
                        <InformationCircleIcon className="size-6 text-zinc-400" />
                        <p className="text-sm font-normal text-zinc-600">Try to be detailed as much as possible to get better results.</p>
                    </div>

                </div>
                <div className="flex flex-row justify-end gap-2">
                    <button type="button" className="default-button" onClick={() => onCancel()}>Cancel</button>
                    <button type="submit" className="blue-button flex items-center gap-3">
                        <PlusIcon className="size-6"></PlusIcon>
                        <span>Create Course</span>
                    </button>
                </div>
            </form>
        </div>
    )
}