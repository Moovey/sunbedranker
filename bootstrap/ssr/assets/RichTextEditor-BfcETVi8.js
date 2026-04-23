import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useRef, useCallback } from "react";
import { useEditor, EditorContent, ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
const ResizableImageComponent = ({ node, updateAttributes, selected }) => {
  const imgRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const onMouseDown = (e) => {
    var _a;
    e.preventDefault();
    e.stopPropagation();
    startX.current = e.clientX;
    startWidth.current = ((_a = imgRef.current) == null ? void 0 : _a.offsetWidth) || 300;
    const onMouseMove = (ev) => {
      const diff = ev.clientX - startX.current;
      const newWidth = Math.max(80, startWidth.current + diff);
      updateAttributes({ width: newWidth });
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  return /* @__PURE__ */ jsxs(NodeViewWrapper, { className: "relative inline-block my-2", style: { width: node.attrs.width ? `${node.attrs.width}px` : "auto", maxWidth: "100%" }, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        ref: imgRef,
        src: node.attrs.src,
        alt: node.attrs.alt || "",
        title: node.attrs.title || "",
        className: `block max-w-full h-auto rounded-lg ${selected ? "ring-2 ring-orange-500" : ""}`,
        style: { width: "100%" },
        draggable: false
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute right-0 top-0 bottom-0 w-2.5 cursor-ew-resize rounded-r transition-colors ${selected ? "bg-orange-500/40 hover:bg-orange-500/60" : "bg-transparent hover:bg-gray-400/30"}`,
        onMouseDown,
        title: "Drag to resize"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute right-0 bottom-0 w-4 h-4 cursor-nwse-resize rounded-bl transition-colors ${selected ? "bg-orange-500/60" : "bg-transparent hover:bg-gray-400/40"}`,
        onMouseDown,
        title: "Drag to resize"
      }
    )
  ] });
};
const ResizableImage = Image.extend({
  addAttributes() {
    var _a;
    return {
      ...(_a = this.parent) == null ? void 0 : _a.call(this),
      width: {
        default: null,
        parseHTML: (element) => {
          var _a2;
          return element.getAttribute("data-width") || ((_a2 = element.style.width) == null ? void 0 : _a2.replace("px", "")) || null;
        },
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            "data-width": attributes.width,
            style: `width: ${attributes.width}px; max-width: 100%;`
          };
        }
      }
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  }
});
const ToolbarButton = ({ onClick, isActive, title, children, disabled }) => /* @__PURE__ */ jsx(
  "button",
  {
    type: "button",
    onClick,
    disabled,
    title,
    className: `p-1.5 sm:p-2 rounded text-sm transition-colors ${isActive ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`,
    children
  }
);
const ToolbarDivider = () => /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-200 mx-0.5" });
const LinkModal = ({ isOpen, onClose, onSubmit }) => {
  const urlRef = useRef(null);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/30", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl p-5 w-full max-w-sm mx-4", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Insert Link" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: urlRef,
        type: "url",
        placeholder: "https://example.com",
        className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
        autoFocus: true,
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit(urlRef.current.value);
          }
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mt-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onSubmit(urlRef.current.value),
          className: "px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors",
          children: "Insert"
        }
      )
    ] })
  ] }) });
};
const FONT_SIZES = [
  { label: "Normal", value: "paragraph" },
  { label: "Heading 1", value: 1 },
  { label: "Heading 2", value: 2 },
  { label: "Heading 3", value: 3 },
  { label: "Heading 4", value: 4 }
];
const EditorToolbar = ({ editor }) => {
  const [showLinkModal, setShowLinkModal] = React.useState(false);
  const fileInputRef = useRef(null);
  const handleImageUpload = useCallback((e) => {
    var _a, _b;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!editor) return;
    const formData = new FormData();
    formData.append("image", file);
    fetch(route("admin.content.upload-image"), {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRF-TOKEN": (_b = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _b.content,
        "Accept": "application/json"
      }
    }).then((res) => res.json()).then((data) => {
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    }).catch(() => {
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }, [editor]);
  if (!editor) return null;
  const handleHeadingChange = (e) => {
    const value = e.target.value;
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
    }
  };
  const getCurrentHeading = () => {
    for (let i = 1; i <= 4; i++) {
      if (editor.isActive("heading", { level: i })) return i;
    }
    return "paragraph";
  };
  const handleLinkSubmit = (url) => {
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: "_blank" }).run();
    }
    setShowLinkModal(false);
  };
  const handleEmbed = () => {
    const url = prompt("Enter embed URL (YouTube, Vimeo, etc.):");
    if (!url) return;
    let embedUrl = url;
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (youtubeMatch) {
      embedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    } else if (vimeoMatch) {
      embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    editor.chain().focus().insertContent(
      `<div class="embed-responsive"><iframe src="${embedUrl}" frameborder="0" allowfullscreen style="width:100%;height:400px;border-radius:8px;"></iframe></div>`
    ).run();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 border-b border-gray-200 bg-gray-50/80 rounded-t-lg", children: [
      /* @__PURE__ */ jsx(
        "select",
        {
          value: getCurrentHeading(),
          onChange: handleHeadingChange,
          className: "px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white cursor-pointer",
          title: "Heading level",
          children: FONT_SIZES.map((s) => /* @__PURE__ */ jsx("option", { value: s.value, children: s.label }, s.value))
        }
      ),
      /* @__PURE__ */ jsx(ToolbarDivider, {}),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleBold().run(),
          isActive: editor.isActive("bold"),
          title: "Bold (Ctrl+B)",
          children: /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2.5, children: [
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" }),
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleItalic().run(),
          isActive: editor.isActive("italic"),
          title: "Italic (Ctrl+I)",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 4h4m-2 0l-4 16m0 0h4" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleUnderline().run(),
          isActive: editor.isActive("underline"),
          title: "Underline (Ctrl+U)",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 4v7a5 5 0 0010 0V4M5 20h14" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleStrike().run(),
          isActive: editor.isActive("strike"),
          title: "Strikethrough",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16 4H9a3 3 0 000 6h6a3 3 0 010 6H8M4 12h16" }) })
        }
      ),
      /* @__PURE__ */ jsx(ToolbarDivider, {}),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().setTextAlign("left").run(),
          isActive: editor.isActive({ textAlign: "left" }),
          title: "Align left",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 6h18M3 12h12M3 18h18" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().setTextAlign("center").run(),
          isActive: editor.isActive({ textAlign: "center" }),
          title: "Align center",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 6h18M6 12h12M3 18h18" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().setTextAlign("right").run(),
          isActive: editor.isActive({ textAlign: "right" }),
          title: "Align right",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 6h18M9 12h12M3 18h18" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().setTextAlign("justify").run(),
          isActive: editor.isActive({ textAlign: "justify" }),
          title: "Justify",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 6h18M3 12h18M3 18h18" }) })
        }
      ),
      /* @__PURE__ */ jsx(ToolbarDivider, {}),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          isActive: editor.isActive("bulletList"),
          title: "Bullet list",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: editor.isActive("orderedList"),
          title: "Numbered list",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 6h11M10 12h11M10 18h11M3 5l2 1V4M3 11h2l-1.5 2H6M3 17h1.5l.5 1-.5 1H3" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: editor.isActive("blockquote"),
          title: "Blockquote",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" }) })
        }
      ),
      /* @__PURE__ */ jsx(ToolbarDivider, {}),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              setShowLinkModal(true);
            }
          },
          isActive: editor.isActive("link"),
          title: "Insert link",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.03a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364l1.757 1.757" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          title: "Upload image",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zm3.75-9a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/*",
          onChange: handleImageUpload,
          className: "hidden"
        }
      ),
      /* @__PURE__ */ jsx(ToolbarButton, { onClick: handleEmbed, title: "Embed video (YouTube, Vimeo)", children: /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: [
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }),
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" })
      ] }) }),
      /* @__PURE__ */ jsx(ToolbarDivider, {}),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: editor.isActive("codeBlock"),
          title: "Code block",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().setHorizontalRule().run(),
          title: "Horizontal rule",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 12h18" }) })
        }
      ),
      /* @__PURE__ */ jsx(ToolbarDivider, {}),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().undo().run(),
          disabled: !editor.can().undo(),
          title: "Undo (Ctrl+Z)",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().redo().run(),
          disabled: !editor.can().redo(),
          title: "Redo (Ctrl+Shift+Z)",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      LinkModal,
      {
        isOpen: showLinkModal,
        onClose: () => setShowLinkModal(false),
        onSubmit: handleLinkSubmit
      }
    )
  ] });
};
function RichTextEditor({ content, onChange, placeholder, error }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] }
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-orange-600 underline hover:text-orange-800",
          rel: "noopener noreferrer"
        }
      }),
      ResizableImage.configure({
        inline: false,
        allowBase64: true
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing your content..."
      })
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose max-w-none focus:outline-none min-h-[300px] px-3 sm:px-4 py-3"
      },
      handleDrop: (view, event, slice, moved) => {
        var _a, _b, _c;
        if (!moved && ((_b = (_a = event.dataTransfer) == null ? void 0 : _a.files) == null ? void 0 : _b.length)) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            const formData = new FormData();
            formData.append("image", file);
            fetch(route("admin.content.upload-image"), {
              method: "POST",
              body: formData,
              headers: {
                "X-CSRF-TOKEN": (_c = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _c.content,
                "Accept": "application/json"
              }
            }).then((res) => res.json()).then((data) => {
              if (data.url) {
                const { schema } = view.state;
                const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                const node = schema.nodes.image.create({ src: data.url });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              }
            }).catch(() => {
              const reader = new FileReader();
              reader.onload = () => {
                const { schema } = view.state;
                const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                const node = schema.nodes.image.create({ src: reader.result });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              };
              reader.readAsDataURL(file);
            });
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        var _a, _b;
        const items = (_a = event.clipboardData) == null ? void 0 : _a.items;
        if (!items) return false;
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            event.preventDefault();
            const file = item.getAsFile();
            if (!file) continue;
            const formData = new FormData();
            formData.append("image", file);
            fetch(route("admin.content.upload-image"), {
              method: "POST",
              body: formData,
              headers: {
                "X-CSRF-TOKEN": (_b = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _b.content,
                "Accept": "application/json"
              }
            }).then((res) => res.json()).then((data) => {
              if (data.url) {
                editor.chain().focus().setImage({ src: data.url }).run();
              }
            }).catch(() => {
              const reader = new FileReader();
              reader.onload = () => {
                editor.chain().focus().setImage({ src: reader.result }).run();
              };
              reader.readAsDataURL(file);
            });
            return true;
          }
        }
        return false;
      }
    },
    onUpdate: ({ editor: editor2 }) => {
      onChange(editor2.getHTML());
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: `border rounded-lg overflow-hidden transition-colors ${error ? "border-red-500" : "border-gray-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20"}`, children: [
    /* @__PURE__ */ jsx(EditorToolbar, { editor }),
    /* @__PURE__ */ jsx(EditorContent, { editor })
  ] });
}
export {
  RichTextEditor as R
};
