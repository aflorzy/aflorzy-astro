const WORDS_PER_MINUTE = 220;

// Estimate reading time in minutes from raw MDX source, ignoring imports,
// code blocks, and JSX tags so long code samples don't inflate the estimate
const readingTime = (body: string): number => {
  const prose = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^import .*$/gm, "")
    .replace(/<[^>]+>/g, "");

  const words = prose.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export { readingTime };
