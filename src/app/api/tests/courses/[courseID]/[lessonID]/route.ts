import { NextResponse } from "next/server";

export async function GET() {
    const lesson = {
        id: "lesson-1",
        title: "Introduction to React",
        previousLessonID: null,
        nextLessonID: "lesson-2",
        completed: false,
        content: [
            {
                "type": "heading",
                "text": "What is HTML?",
                "id": 1
            },
            {
                "type": "video",
                "src": "",
                "searchTerm": "introduction to HTML",
                "id": 2
            },
            {
                "type": "paragraph",
                "text": "HTML stands for HyperText Markup Language. It's not a programming language; it's a markup language used to structure content on the internet. Think of it as the skeleton of a webpage, defining elements like headings, paragraphs, images, and links.",
                "id": 3
            },
            {
                "type": "divider",
                "id": 4
            },
            {
                "type": "heading",
                "text": "Basic HTML Structure",
                "id": 5
            },
            {
                "type": "paragraph",
                "text": "Every HTML document has a fundamental structure. Let's look at the essential tags:",
                "id": 6
            },
            {
                "type": "code",
                "text": "<!DOCTYPE html>\n<html>\n<head>\n    <title>My First Webpage</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>This is my first paragraph.</p>\n</body>\n</html>",
                "lang": "html",
                "id": 7
            },
            {
                "type": "paragraph",
                "text": "Let's break down these tags:",
                "id": 8
            },
            {
                "type": "unorderedlist",
                "items": [
                    "<!DOCTYPE html>: This declaration defines that the document is an HTML5 document. It should always be the very first line of your HTML code.",
                    "<html>: This is the root element of an HTML page. All other content goes inside this tag.",
                    "<head>: This element contains meta-information about the HTML page, such as its title, links to stylesheets, and scripts. This content is not displayed directly on the webpage.",
                    "<title>: Inside the <head>, this tag sets the title that appears in the browser tab or window title bar.",
                    "<body>: This element contains all the visible content of the webpage, such as headings, paragraphs, images, links, etc."
                ],
                "id": 9
            },
            {
                "type": "divider",
                "id": 10
            },
            {
                "type": "heading",
                "text": "Headings and Paragraphs",
                "id": 11
            },
            {
                "type": "paragraph",
                "text": "Headings are used to define titles and subtitles. HTML offers six levels of headings, from <h1> (the most important) to <h6> (the least important).",
                "id": 12
            },
            {
                "type": "code",
                "text": "<h1>This is a main heading</h1>\n<h2>This is a sub-heading</h2>\n<h3>This is another sub-heading</h3>",
                "lang": "html",
                "id": 13
            },
            {
                "type": "paragraph",
                "text": "Paragraphs are used to define blocks of text. The <p> tag creates a new paragraph.",
                "id": 14
            },
            {
                "type": "code",
                "text": "<p>This is a paragraph of text. It can contain sentences and words.</p>\n<p>This is another paragraph, separated from the first one.</p>",
                "lang": "html",
                "id": 15
            },
            {
                "type": "divider",
                "id": 16
            },
            {
                "type": "heading",
                "text": "Adding Images",
                "id": 17
            },
            {
                "type": "paragraph",
                "text": "To include an image in your webpage, you use the <img> tag. This is an empty tag, meaning it doesn't have a closing tag. It uses attributes to provide information.",
                "id": 18
            },
            {
                "type": "code",
                "text": "<img src=\"image.jpg\" alt=\"A descriptive image text\">",
                "lang": "html",
                "id": 19
            },
            {
                "type": "unorderedlist",
                "items": [
                    "src (source): This attribute specifies the path to the image file.",
                    "alt (alternative text): This attribute provides a description of the image. It's crucial for accessibility (screen readers) and for when the image cannot be displayed."
                ],
                "id": 20
            },
            {
                "type": "paragraph",
                "text": "Here's an example of an image being displayed on a webpage:",
                "id": 21
            },
            {
                "type": "image",
                "src": "",
                "alt": "example of the <img> element being used on a webpage",
                "id": 22
            },
            {
                "type": "divider",
                "id": 23
            },
            {
                "type": "heading",
                "text": "Creating Links",
                "id": 24
            },
            {
                "type": "paragraph",
                "text": "Links are what make the web \"hypertext.\" You use the <a> (anchor) tag to create a hyperlink.",
                "id": 25
            },
            {
                "type": "code",
                "text": "<a href=\"https://www.example.com\">Visit Example Website</a>",
                "lang": "html",
                "id": 26
            },
            {
                "type": "unorderedlist",
                "items": [
                    "href (hypertext reference): This attribute specifies the destination URL of the link.",
                    "The text between the opening and closing <a> tags is what the user clicks on.",
                    "You can also link to other pages within your own website:"
                ],
                "id": 27
            },
            {
                "type": "code",
                "text": "<a href=\"about.html\">About Us</a>",
                "lang": "html",
                "id": 28
            },
            {
                "type": "divider",
                "id": 29
            },
            {
                "type": "heading",
                "text": "Lists",
                "id": 30
            },
            {
                "type": "paragraph",
                "text": "HTML supports ordered and unordered lists. Unordered lists (<ul>) are used for items where the order doesn't matter, typically displayed with bullet points.",
                "id": 31
            },
            {
                "type": "code",
                "text": "<ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n    <li>Item 3</li>\n</ul>",
                "lang": "html",
                "id": 32
            },
            {
                "type": "paragraph",
                "text": "Ordered lists (<ol>) are used for items where the order does matter, typically displayed with numbers.",
                "id": 33
            },
            {
                "type": "code",
                "text": "<ol>\n    <li>First item</li>\n    <li>Second item</li>\n    <li>Third item</li>\n</ol>",
                "lang": "html",
                "id": 34
            },
            {
                "type": "paragraph",
                "text": "Here's what an unordered list and an ordered list look like side-by-side:",
                "id": 35
            },
            {
                "type": "image",
                "src": "",
                "alt": "example of <ol> and <ul> lists",
                "id": 36
            },
            {
                "type": "heading",
                "text": "What's Next?",
                "id": 37
            },
            {
                "type": "paragraph",
                "text": "This is just the beginning! HTML has many more tags and attributes for structuring tables, forms, multimedia, and more. Once you have a solid grasp of HTML, you'll move on to CSS (Cascading Style Sheets) to make your webpages look beautiful, and then JavaScript to make them interactive.",
                "id": 38
            }
        ]
    }

    return NextResponse.json(lesson);

}