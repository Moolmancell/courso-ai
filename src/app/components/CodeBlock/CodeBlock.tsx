import { useEffect } from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export function CodeBlock({id, text, lang}: {id: string, text: string, lang: string}) {
    
    useEffect(() => {
        hljs.highlightAll();
    }, [text, lang]);
    
    return <div>
        <div className="px-4 py-3 bg-white rounded-t-xl border border-zinc-300 border-b-transparent overflow-x-auto">
            <p className="font-light text-zinc-700 text-sm">{lang}</p>
        </div>
        <pre key={id} data-testid="pre" className={`${"language-" + lang} bg-white rounded-b-xl border border-zinc-300 overflow-x-auto`}>
            <code>{text}</code>
        </pre>
    </div>

}