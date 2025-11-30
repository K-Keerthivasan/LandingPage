'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import { useImperativeHandle, forwardRef, useEffect, useRef } from 'react';

// Define the props for the component
type Props = {
    content: string; // The initial HTML content for the editor
};

// Define the shape of the ref object that will be exposed
export type ServicesContentEditorRef = {
    getContent: () => string; // Function to get the current HTML content
    clearContent: () => void; // Function to clear the editor content
};

// Utility function to determine button classes based on active state
const getButtonClasses = (isActive: boolean) =>
    `btn-tiptap ${isActive ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`;

// ForwardRef is used to allow the parent component to get a ref to this component
// and call its methods (like getContent and clearContent)
const ContentEditor = forwardRef<ServicesContentEditorRef, Props>(({ content }, ref) => {
    // Ref to track if this is the first time the component is loaded
    const isFirstLoad = useRef(true);

    // Initialize the Tiptap editor using the useEditor hook
    const editor = useEditor({
        // Configure the extensions to enable various features
        extensions: [
            StarterKit, // Includes basic formatting like bold, italic, paragraphs, lists, etc.
            Underline, // Explicitly add underline as it's not in StarterKit
            Link.configure({ openOnClick: false }), // Add link support, prevent opening on click within editor
            Image, // Add image support
            Youtube.configure({ controls: true, nocookie: true }), // Add YouTube embed support
            Table.configure({ resizable: false }), // Add table support, disable resizing
            TableRow, // Required for tables
            TableHeader, // Required for tables
            TableCell, // Required for tables
        ],
        // Set the initial content of the editor
        content,
        // Configure editor properties, like the class for the editable area
        editorProps: {
            attributes: {
                // Apply Tailwind prose classes for basic styling of content
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none dark:prose-invert',
            },
        },
        autofocus: false, // Don't autofocus the editor on load
        editable: true, // Make the editor editable
        injectCSS: true, // Inject default Tiptap CSS
        immediatelyRender: false, // Don't render immediately (allows for async loading if needed)
    });

    // Expose methods to the parent component via the ref
    useImperativeHandle(ref, () => ({
        // Return the current HTML content of the editor
        getContent: () => editor?.getHTML() || '',
        // Clear the editor content
        clearContent: () => editor?.commands.clearContent(),
    }));

    // useEffect to potentially set content after initial load.
    useEffect(() => {
        if (editor && isFirstLoad.current) {
            // Set content only on the very first load.
            editor.commands.setContent(content);
            isFirstLoad.current = false;
        } else if (editor && !isFirstLoad.current && editor.getHTML() !== content) {

        }
    }, [editor, content]); // Depend on editor and content

    // Render a loading message if the editor is not yet initialized
    if (!editor) {
        return <p>Loading editor...</p>;
    }

    // Render the editor UI
    return (
        <div className="border rounded bg-white dark:bg-gray-800 p-4 space-y-2">
            {/* Menu Bar with formatting buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
                {/* Basic Formatting Buttons */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={getButtonClasses(editor.isActive('bold'))}
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={getButtonClasses(editor.isActive('italic'))}
                >
                    Italic
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={getButtonClasses(editor.isActive('underline'))}
                >
                    Underline
                </button>

                {/* Heading Buttons */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 1 }))}
                >
                    H1
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={getButtonClasses(editor.isActive('heading', { level: 2 }))}
                >
                    H2
                </button>

                {/* List Buttons */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={getButtonClasses(editor.isActive('bulletList'))}
                >
                    Bullet List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={getButtonClasses(editor.isActive('orderedList'))}
                >
                    Ordered List
                </button>

                {/* Code Block Button */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={getButtonClasses(editor.isActive('codeBlock'))}
                >
                    Code Block
                </button>

                {/* Link Button */}
                <button
                    type="button"
                    onClick={() => {
                        const url = prompt('Enter URL');
                        if (url !== null && url !== undefined) {
                            if (url === '') {
                                editor?.chain().focus().unsetLink().run();
                            } else {
                                editor?.chain().focus().setLink({ href: url }).run();
                            }
                        }
                    }}
                    className="btn-tiptap bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                    Link
                </button>

                {/* Image Button */}
                <button
                    type="button"
                    onClick={() => {
                        const url = prompt('Enter Image URL');
                        if (url !== null && url !== undefined && url !== '') {
                            editor?.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                    className="btn-tiptap bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                    Image
                </button>

                {/* YouTube Button */}
                <button
                    type="button"
                    onClick={() => {
                        const url = prompt('Enter YouTube URL');
                        if (url !== null && url !== undefined && url !== '') {
                            editor?.chain().focus().setYoutubeVideo({ src: url }).run();
                        }
                    }}
                    className="btn-tiptap bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                    YouTube
                </button>

                {/* Table Buttons */}
                <button
                    type="button"
                    onClick={() => {
                        editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                    }}
                    className="btn-tiptap bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                    Table
                </button>
                <button
                    type="button"
                    onClick={() => editor?.chain().focus().addColumnBefore().run()}
                    className="btn-tiptap bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                    +Col
                </button>
                <button
                    type="button"
                    onClick={() => editor?.chain().focus().addRowBefore().run()}
                    className="btn-tiptap bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                    +Row
                </button>
                <button
                    type="button"
                    onClick={() => editor?.chain().focus().mergeCells().run()}
                    className="btn-tiptap bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                    Merge
                </button>
                <button
                    type="button"
                    onClick={() => editor?.chain().focus().deleteTable().run()}
                    className="btn-tiptap bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                    🗑 Table
                </button>
            </div>

            {/* The main editable area for the Tiptap editor */}
            <EditorContent editor={editor} />
        </div>
    );
});

// Set a display name for easier debugging
ContentEditor.displayName = 'ContentEditor';

// Export the component
export default ContentEditor;
