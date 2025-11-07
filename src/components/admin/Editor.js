// components/admin/Editor.js
"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Transforms, Editor } from "slate";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaTrash,
} from "react-icons/fa";

export default function TextEditor({ content = "", onChange, makeItClean }) {
  const [editor] = useState(() => withReact(createEditor()));

  // Parse initial content
  const initialValue = useMemo(() => {
    if (content) {
      try {
        return JSON.parse(content);
      } catch {
        return [{ type: "paragraph", children: [{ text: content }] }];
      }
    }
    return [{ type: "paragraph", children: [{ text: "Start writing..." }] }];
  }, [content]);

  // === makeItClean: Jab parent se call ho, editor khali kar do ===
  useEffect(() => {
    if (makeItClean) {
      editor.children.forEach(() => Transforms.delete(editor, { at: [0] }));
      Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ text: "" }],
      });
      onChange?.(JSON.stringify(editor.children));
    }
  }, [makeItClean, editor, onChange]);

  // Render text styles
  const renderLeaf = useCallback((props) => {
    let { attributes, children, leaf } = props;
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    return <span {...attributes}>{children}</span>;
  }, []);

  // Render blocks
  const renderElement = useCallback((props) => {
    const { element, attributes, children } = props;
    switch (element.type) {
      case "heading-one":
        return (
          <h1 {...attributes} className="text-3xl font-bold">
            {children}
          </h1>
        );
      case "heading-two":
        return (
          <h2 {...attributes} className="text-2xl font-bold">
            {children}
          </h2>
        );
      case "heading-three":
        return (
          <h3 {...attributes} className="text-xl font-bold">
            {children}
          </h3>
        );
      case "bulleted-list":
        return (
          <ul {...attributes} className="list-disc pl-6">
            {children}
          </ul>
        );
      case "numbered-list":
        return (
          <ol {...attributes} className="list-decimal pl-6">
            {children}
          </ol>
        );
      case "list-item":
        return <li {...attributes}>{children}</li>;
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  // Toggle formatting
  const toggleMark = (format) => {
    const isActive = isMarkActive(format);
    if (isActive) Editor.removeMark(editor, format);
    else Editor.addMark(editor, format, true);
    onChange?.(JSON.stringify(editor.children));
  };

  const toggleBlock = (format) => {
    const isActive = isBlockActive(format);
    const isList = ["bulleted-list", "numbered-list"].includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) => ["bulleted-list", "numbered-list"].includes(n.type),
      split: true,
    });

    const newType = isActive ? "paragraph" : isList ? "list-item" : format;
    Transforms.setNodes(editor, { type: newType });

    if (!isActive && isList) {
      Transforms.wrapNodes(editor, { type: format, children: [] });
    }

    onChange?.(JSON.stringify(editor.children));
  };

  const clearAll = () => {
    editor.children.forEach(() => Transforms.delete(editor, { at: [0] }));
    Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [{ text: "" }],
    });
    onChange?.(JSON.stringify(editor.children));
  };

  // Check active state
  const isMarkActive = (format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const isBlockActive = (format) => {
    const [match] = Editor.nodes(editor, { match: (n) => n.type === format });
    return !!match;
  };

  // Toolbar buttons
  const buttons = [
    { format: "bold", icon: <FaBold className="w-4 h-4" />, type: "mark" },
    { format: "italic", icon: <FaItalic className="w-4 h-4" />, type: "mark" },
    {
      format: "underline",
      icon: <FaUnderline className="w-4 h-4" />,
      type: "mark",
    },
    {
      format: "heading-one",
      icon: <FaHeading className="w-4 h-4" />,
      type: "block",
      tooltip: "H1",
    },
    {
      format: "heading-two",
      icon: <FaHeading className="w-3 h-3" />,
      type: "block",
      tooltip: "H2",
    },
    {
      format: "heading-three",
      icon: <FaHeading className="w-2.5 h-2.5" />,
      type: "block",
      tooltip: "H3",
    },
    {
      format: "bulleted-list",
      icon: <FaListUl className="w-4 h-4" />,
      type: "block",
    },
    {
      format: "numbered-list",
      icon: <FaListOl className="w-4 h-4" />,
      type: "block",
    },
    {
      format: "clear",
      icon: <FaTrash className="w-4 h-4" />,
      type: "action",
      action: clearAll,
    },
  ];

  return (
    <div className="w-full bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 text-white shadow-xl">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-700 pb-3">
        {buttons.map((btn, i) => {
          const isActive =
            btn.type === "mark"
              ? isMarkActive(btn.format)
              : btn.type === "block"
              ? isBlockActive(btn.format)
              : false;

          return (
            <button
              key={i}
              type="button"
              title={btn.tooltip}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (btn.type === "action") btn.action();
                else if (btn.type === "mark") toggleMark(btn.format);
                else toggleBlock(btn.format);
              }}
              className={`p-2 rounded-md transition-all duration-200 flex items-center justify-center
                ${
                  isActive
                    ? "bg-red-600 text-white shadow-md scale-105"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {btn.icon}
            </button>
          );
        })}
      </div>

      {/* Editor */}
      <div className="bg-[#111] p-5 rounded-xl border border-gray-700 min-h-[400px] focus-within:border-red-600 transition-all">
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={(v) => onChange(JSON.stringify(v))}
        >
          <Editable
            placeholder="Start writing..."
            className="min-h-[350px] text-white focus:outline-none prose prose-invert max-w-none"
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </Slate>
      </div>
    </div>
  );
}
