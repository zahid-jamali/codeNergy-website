"use client";

import React, { useEffect, useState } from "react";
import { Button, TextInput, Select, Card, Group } from "@mantine/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export default function AdminBlogsPage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Ensure editor is initialized only after mount (client-side only)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const editor = isClient
    ? useEditor({
        extensions: [StarterKit, Link],
        content: form.content,
        immediatelyRender: false, // ✅ avoids hydration mismatch
        onUpdate: ({ editor }) => {
          setForm((prev) => ({ ...prev, content: editor.getHTML() }));
        },
      })
    : null;

  // Fetch categories
  useEffect(() => {
    fetch("/api/blog/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Submit blog
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create blog");
      alert("Blog created successfully!");
      setForm({ title: "", category: "", content: "" });
      editor?.commands.setContent("");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card shadow="sm" radius="md" p="lg" withBorder>
      <h2 className="text-xl font-semibold mb-4">Create Blog</h2>

      <TextInput
        label="Title"
        placeholder="Enter blog title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        mb="md"
      />

      <Select
        label="Category"
        placeholder="Select category"
        data={categories.map((c) => ({ label: c.name, value: c._id }))}
        value={form.category}
        onChange={(val) => setForm({ ...form, category: val })}
        mb="md"
      />

      <div className="border rounded-lg p-2 mb-4">
        <label className="block mb-2 text-sm font-medium">Content</label>
        {isClient && editor ? (
          <EditorContent editor={editor} />
        ) : (
          <div className="text-gray-400 text-sm">Loading editor...</div>
        )}
      </div>

      <Group position="right">
        <Button loading={loading} onClick={handleSubmit}>
          Publish
        </Button>
      </Group>
    </Card>
  );
}
