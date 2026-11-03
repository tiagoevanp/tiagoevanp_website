// Ids for the headings of MDX pages, so sections can be linked to. Plain JavaScript because next.config.ts passes
// the rehype plugin to the MDX loader by path (Turbopack only takes serializable options) and Node imports it as is.

// Ids the page layout already uses (PageNavbar, SkillDocsLayout, the language Dropdown); a heading must not take one
const reservedIds = ['content', 'mobile-menu', 'skill-docs-sidebar', 'language'];

const headingTags = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

// Readable in the URL in both languages: accents are dropped ("Métodos úteis de array" → "metodos-uteis-de-array")
// and punctuation collapses into single hyphens ("Optional chaining (?.)" → "optional-chaining")
export const slugify = (text) => text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'section';

// One per page: a repeated heading gets a numbered id ("example", "example-2"), so every id stays unique
export const createSlugger = (reserved = reservedIds) => {
    const used = new Set(reserved);

    return (text) => {
        const base = slugify(text);
        let id = base;

        for (let count = 2; used.has(id); count++) id = `${base}-${count}`;

        used.add(id);

        return id;
    };
};

// The text of a hast node, including inline code and emphasis inside a heading
const toText = (node) => {
    if (node.type === 'text') return node.value;

    return node.children ? node.children.map(toText).join('') : '';
};

const visitHeadings = (node, onHeading) => {
    if (node.type === 'element' && headingTags.has(node.tagName)) {
        onHeading(node);

        return;
    }

    node.children?.forEach((child) => visitHeadings(child, onHeading));
};

// Rehype plugin: gives every heading without an id one from its text, in document order
export default function rehypeHeadingIds() {
    return (tree) => {
        // Ids written by hand in the MDX are kept and can't be taken by another heading
        const handWritten = [];

        visitHeadings(tree, (heading) => {
            if (heading.properties?.id) handWritten.push(String(heading.properties.id));
        });

        const slug = createSlugger([...reservedIds, ...handWritten]);

        visitHeadings(tree, (heading) => {
            heading.properties ??= {};
            heading.properties.id ??= slug(toText(heading));
        });
    };
}
