import Image from "next/image";
import { CodeBlock } from "@/features/Lesson/components/CodeBlock/CodeBlock";
import styles from './LessonContentRenderer.module.css'
import { LessonContent } from "../../types/LessonContent";


export function LessonContentRenderer({content}: {content: LessonContent[]}) {
    return <div className="flex flex-col gap-4 mt-8">
        {content?.length ? (
            content.map((block) => {
                switch (block.type) {
                    case "heading":
                        return <h2 className="font-bold text-lg" key={block.id} data-testid="heading2">{block.text}</h2>;
                    case "paragraph":
                        return <p key={block.id} dangerouslySetInnerHTML={{ __html: block.text }} className={styles.apply_inline_styles} data-testid="paragraph">

                        </p>
                    case "code":
                        return (
                            <CodeBlock id={block.id} text={block.text} lang={block.lang} />
                        );
                    case "image":
                        return (
                            <Image
                                key={block.id}
                                src={block.src}
                                alt={block.alt || "Image"}
                                width={600}
                                height={400}
                                className="m-auto w-full max-w-3xl h-auto p-4 bg-white rounded-3xl border border-zinc-300"
                                unoptimized
                            />
                        );
                    case "video":
                        return (
                            <iframe
                                key={block.id}
                                data-testid="video"
                                src={block.src}
                                title={block.searchTerm || "Video"}
                                frameBorder="0"
                                className="aspect-video m-auto max-w-3xl p-4 bg-white rounded-3xl border border-zinc-300"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        );
                    case "divider":
                        return <hr key={block.id} className="h-0.5 w-full bg-zinc-300 rounded-full" data-testid="divider" />;
                    case "orderedlist":
                        return (
                            <ol key={block.id} className="list-decimal ml-4">
                                {block.items.map((item, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} className={styles.apply_inline_styles}></li>
                                ))}
                            </ol>
                        );
                    case "unorderedlist":
                        return (
                            <ul key={block.id} className="list-disc ml-4">
                                {block.items.map((item, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} className={styles.apply_inline_styles}></li>
                                ))}
                            </ul>
                        );
                    default:
                        return (
                            <p className="text-red-500 bg-red-200 border border-red-500 rounded-3xl p-4">
                                Unsupported content type: {(block as any).type}
                            </p>
                        );
                }
            })
        ) : (
            <p className="text-zinc-500 bg-zinc-200 border border-zinc-500 rounded-3xl p-4">No content available.</p>
        )}
    </div>

}