'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Code, Heading1, Heading2, Heading3, List, ListOrdered, Quote,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon, Table as TableIcon,
  Undo, Redo, Palette, Highlighter
} from 'lucide-react';
import { useCallback } from 'react';

type Props = {
  content: string;
  onChange: (html: string) => void;
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt('URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const btnClass = "p-2 hover:bg-white/10 rounded transition-colors text-white/70 hover:text-white";
  const activeClass = "bg-primary/20 text-primary";

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-[#111] border-b border-white/10 rounded-t-lg items-center">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`${btnClass} ${editor.isActive('bold') ? activeClass : ''}`}><Bold size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`${btnClass} ${editor.isActive('italic') ? activeClass : ''}`}><Italic size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${btnClass} ${editor.isActive('underline') ? activeClass : ''}`}><UnderlineIcon size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`${btnClass} ${editor.isActive('strike') ? activeClass : ''}`}><Strikethrough size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={`${btnClass} ${editor.isActive('code') ? activeClass : ''}`}><Code size={16} /></button>
      
      <div className="w-px h-6 bg-white/10 mx-1"></div>
      
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${btnClass} ${editor.isActive('heading', { level: 1 }) ? activeClass : ''}`}><Heading1 size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${btnClass} ${editor.isActive('heading', { level: 2 }) ? activeClass : ''}`}><Heading2 size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${btnClass} ${editor.isActive('heading', { level: 3 }) ? activeClass : ''}`}><Heading3 size={16} /></button>
      
      <div className="w-px h-6 bg-white/10 mx-1"></div>

      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`${btnClass} ${editor.isActive({ textAlign: 'left' }) ? activeClass : ''}`}><AlignLeft size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`${btnClass} ${editor.isActive({ textAlign: 'center' }) ? activeClass : ''}`}><AlignCenter size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`${btnClass} ${editor.isActive({ textAlign: 'right' }) ? activeClass : ''}`}><AlignRight size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`${btnClass} ${editor.isActive({ textAlign: 'justify' }) ? activeClass : ''}`}><AlignJustify size={16} /></button>

      <div className="w-px h-6 bg-white/10 mx-1"></div>

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${btnClass} ${editor.isActive('bulletList') ? activeClass : ''}`}><List size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${btnClass} ${editor.isActive('orderedList') ? activeClass : ''}`}><ListOrdered size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${btnClass} ${editor.isActive('blockquote') ? activeClass : ''}`}><Quote size={16} /></button>

      <div className="w-px h-6 bg-white/10 mx-1"></div>

      <button type="button" onClick={setLink} className={`${btnClass} ${editor.isActive('link') ? activeClass : ''}`}><LinkIcon size={16} /></button>
      <button type="button" onClick={addImage} className={btnClass}><ImageIcon size={16} /></button>
      <button type="button" onClick={insertTable} className={btnClass}><TableIcon size={16} /></button>

      <div className="w-px h-6 bg-white/10 mx-1"></div>
      
      <input 
        type="color" 
        onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
        value={editor.getAttributes('textStyle').color || '#ffffff'}
        className="w-6 h-6 p-0 border-0 cursor-pointer bg-transparent"
        title="Text Color"
      />
      <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={`${btnClass} ${editor.isActive('highlight') ? activeClass : ''}`}><Highlighter size={16} /></button>

      <div className="w-px h-6 bg-white/10 mx-1"></div>
      
      <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={`${btnClass} disabled:opacity-30`}><Undo size={16} /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={`${btnClass} disabled:opacity-30`}><Redo size={16} /></button>
    </div>
  );
};

export function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextStyle,
      Color,
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 max-w-none focus:outline-none min-h-[400px] p-6 bg-[#1a1a1a] rounded-b-lg border-x border-b border-white/10',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="rich-text-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
