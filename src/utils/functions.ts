// Parser markdown simples (sem lib externa)
export function parseMarkdown(md: string): string {
  return (
    md
      // Headers
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      // Bold e italic
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Código inline
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Código em bloco
      .replace(/```[\w]*\n([\s\S]+?)```/g, "<pre><code>$1</code></pre>")
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      // Listas
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>[\s\S]+?<\/li>)/g, "<ul>$1</ul>")
      // Numeradas
      .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
      // Parágrafos
      .split("\n\n")
      .map((block) => {
        if (
          block.startsWith("<h") ||
          block.startsWith("<ul") ||
          block.startsWith("<pre")
        )
          return block;
        if (block.trim() === "") return "";
        return `<p>${block.trim()}</p>`;
      })
      .join("\n")
  );
}
