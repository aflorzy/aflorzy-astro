/** @jsxImportSource preact */
import { useEffect, useState } from 'preact/hooks';

function normalize(s: string) {
  return s.toLowerCase();
}

export default function Search() {
  const [q, setQ] = useState('');
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const list = document.getElementById('post-list');
    if (!list) return;
    const items = Array.from(list.querySelectorAll('li.link-card')) as HTMLElement[];
    const term = normalize(q.trim());
    let visible = 0;
    items.forEach((el) => {
      const title = normalize(el.querySelector('.left h3')?.textContent ?? '');
      const body = normalize(el.querySelector('.left p')?.textContent ?? '');
      const tagEls = Array.from(el.querySelectorAll('.tags .tag')) as HTMLElement[];
      const tags = tagEls.map((t) => normalize(t.textContent ?? ''));
      const match = !term || title.includes(term) || body.includes(term) || tags.some((t) => t.includes(term));
      el.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    setCount(q.trim().length > 0 ? visible : null);
  }, [q]);

  return (
    <section>
      <label htmlFor="search" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Search posts and projects
      </label>
      <input
        id="search"
        type="search"
        placeholder="Type to filter by title, description, or tag..."
        value={q}
        onInput={(e) => setQ((e.currentTarget as HTMLInputElement).value)}
        style={{
          width: '100%',
          padding: '0.6rem 0.8rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(255,255,255,0.15)',
          background: '#23262d',
          color: 'white',
          outline: 'none',
        }}
      />
      {q.trim().length > 0 && (
        <p aria-live="polite" style={{ margin: '0.75rem 0' }}>
          {(count ?? 0)} result{(count ?? 0) === 1 ? '' : 's'}
        </p>
      )}
    </section>
  );
}
