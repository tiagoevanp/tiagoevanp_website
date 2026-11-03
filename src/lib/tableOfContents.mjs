// The "On this page" list of longer MDX pages, built from their section headings at build time, so it's in the
// static HTML and needs no pass over the DOM. Plain JavaScript for the same reason as headingIds.mjs, and listed
// after it in next.config.ts, since it needs the ids that plugin gives the headings
import { toText } from './headingIds.mjs';

// Shorter pages can be taken in at a glance, so a list would only push their text down
const minSections = 4;

// Rehype plugin: inserts <TableOfContents headings='[{"id","title"}]' /> (mapped in mdx-components.tsx) right before
// the first section, so it comes after the title and intro. Only the page's own sections count: headings inside
// JSX (example components, a <div> in the MDX) are left out, and so are headings without an id
export default function rehypeTableOfContents() {
    return (tree) => {
        const sections = tree.children.filter(
            (node) => node.type === 'element' && node.tagName === 'h2' && node.properties?.id,
        );

        if (sections.length < minSections) return;

        const headings = sections.map((heading) => ({
            id: String(heading.properties.id),
            title: toText(heading).trim(),
        }));

        // A string attribute, so the plugin doesn't have to build an estree expression for the array
        tree.children.splice(tree.children.indexOf(sections[0]), 0, {
            type: 'mdxJsxFlowElement',
            name: 'TableOfContents',
            attributes: [{ type: 'mdxJsxAttribute', name: 'headings', value: JSON.stringify(headings) }],
            children: [],
        });
    };
}
