// Syntax highlighting for the code blocks of MDX pages, done while the page builds so the static HTML already has the
// coloured tokens and no highlighter ships to the browser. Plain JavaScript for the same reason as headingIds.mjs:
// next.config.ts passes the rehype plugin to the MDX loader by path and Node imports it as is.
// Inline code isn't touched, so it keeps the site's chip style.
import { createHighlighter } from 'shiki';

// Tokens are coloured with CSS variables, not fixed colours, so one set of spans follows the theme: theme.sass sets
// the variables for light and dark under the same selectors as the rest of the palette, with or without JS
const color = (token) => `var(--code-${token})`;

const theme = {
    name: 'site',
    type: 'light',
    colors: {
        'editor.foreground': color('foreground'),
        'editor.background': 'var(--code-background)',
    },
    // The more specific scope wins, so e.g. string.regexp takes the variable colour over the string one
    tokenColors: [
        { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: color('comment') } },
        {
            scope: ['keyword', 'storage', 'entity.name.tag.css', 'entity.name.tag.scss', 'entity.name.tag.sass'],
            settings: { foreground: color('keyword') },
        },
        // Operators and template literal substitutions read as plain code; word operators stay keywords
        { scope: ['keyword.operator', 'meta.template.expression'], settings: { foreground: color('foreground') } },
        {
            scope: ['keyword.operator.new', 'keyword.operator.expression', 'keyword.operator.word'],
            settings: { foreground: color('keyword') },
        },
        { scope: ['string', 'punctuation.definition.string'], settings: { foreground: color('string') } },
        {
            scope: [
                'constant.numeric',
                'constant.language',
                'constant.other',
                'keyword.other.unit',
                'support.constant',
                'variable.parameter',
                'variable.language',
                'entity.other.attribute-name',
            ],
            settings: { foreground: color('constant') },
        },
        { scope: ['support.type.property-name'], settings: { foreground: color('attribute') } },
        {
            scope: [
                'entity.name.function',
                'support.function',
                'entity.name.type',
                'entity.name.class',
                'entity.other.inherited-class',
            ],
            settings: { foreground: color('function') },
        },
        {
            scope: [
                'entity.name.tag',
                'entity.other.attribute-name.class.css',
                'entity.other.attribute-name.id.css',
                'entity.other.attribute-name.class.scss',
                'entity.other.attribute-name.id.scss',
                'string.regexp',
                'variable.scss',
                'variable.css',
                'variable.argument.css',
                'source.sass variable.other.name',
                'source.sass variable.other.value',
            ],
            settings: { foreground: color('variable') },
        },
        // The indented syntax's grammar scopes units as keywords and commas as comments
        { scope: ['keyword.control.unit'], settings: { foreground: color('constant') } },
        { scope: ['source.sass comment.punctuation'], settings: { foreground: color('foreground') } },
    ],
};

// The fence languages the articles use (lowercase, see the MDX files) and the grammar each one takes
const grammars = { js: 'javascript', css: 'css', scss: 'scss', sass: 'sass', html: 'html' };

// One highlighter for the whole build, created on first use
let highlighter;
const getHighlighter = () => highlighter ??= createHighlighter({
    themes: [theme],
    langs: [...new Set(Object.values(grammars))],
});

const getLanguage = (code) => {
    const className = [code.properties?.className ?? []].flat().find((name) => String(name).startsWith('language-'));

    return className ? String(className).slice('language-'.length) : undefined;
};

const toText = (node) => {
    if (node.type === 'text') return node.value;

    return node.children ? node.children.map(toText).join('') : '';
};

const visitBlocks = (node, onBlock) => {
    if (node.type === 'element' && node.tagName === 'pre') {
        const code = node.children?.find((child) => child.type === 'element' && child.tagName === 'code');

        if (code) onBlock(code);

        return;
    }

    node.children?.forEach((child) => visitBlocks(child, onBlock));
};

// Rehype plugin: replaces the text of each fenced block with Shiki's tokens. The pre and code elements are kept as
// they are (code keeps its language-* class for the CodeBlock label), so the block's look stays in CSS and Shiki's
// own pre attributes (inline background, tabindex) are left out. A language Shiki wasn't given stays plain text
export default function rehypeHighlightCode() {
    return async (tree) => {
        const blocks = [];

        visitBlocks(tree, (code) => blocks.push(code));

        if (blocks.length === 0) return;

        const shiki = await getHighlighter();

        blocks.forEach((code) => {
            const grammar = grammars[getLanguage(code)];

            if (!grammar) return;

            // Markdown ends every block with a line break, which would become an empty last line
            const text = toText(code).replace(/\n$/, '');
            const root = shiki.codeToHast(text, { lang: grammar, theme: theme.name });
            const highlighted = root.children[0].children.find((child) => child.tagName === 'code');

            code.children = highlighted.children;
        });
    };
}
