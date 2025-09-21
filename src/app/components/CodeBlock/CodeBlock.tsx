import { useEffect, useState } from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export function CodeBlock({id, text, lang}: {id: string, text: string, lang: string}) {
    
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        hljs.highlightAll();
    }, [text, lang]);
    
    return <div>
        <div className="px-4 py-3 bg-white rounded-t-xl border border-zinc-300 border-b-transparent flex flex-row justify-between items-center">
            <p className="font-light text-zinc-700 text-sm">{lang}</p>
            <button data-testid="copy-button" className="rounded-full p-2 hover:bg-zinc-100 flex flex-row gap-2" onClick={() => {
                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
            }}> 
                {copied && <span className="text-sm font-medium">Copied!</span>}
                <DocumentDuplicateIcon className="w-5 h-auto"></DocumentDuplicateIcon>
            </button>
        </div>
        <pre key={id} data-testid="pre" className={`${"language-" + lang} bg-white rounded-b-xl border border-zinc-300 overflow-x-auto`}>
            <code>{text}</code>
        </pre>
    </div>

}