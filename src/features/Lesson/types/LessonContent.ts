export type LessonContent =
    | { type: "heading"; id: string; text: string }
    | { type: "paragraph"; id: string; text: string }
    | { type: "code"; id: string; text: string, lang: string }
    | { type: "image"; id: string; src: string; alt?: string }
    | { type: "video"; id: string; src: string; searchTerm?: string }
    | { type: "divider"; id: string }
    | { type: "orderedlist"; id: string; items: string[] }
    | { type: "unorderedlist"; id: string; items: string[] };