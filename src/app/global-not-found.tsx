import { detectLanguageScript } from '@/i18n/detectLanguage';
import { NotFound } from '@/UI/NotFound/NotFound';
import { RootLayout } from '@/UI/RootLayout/RootLayout';

export { metadata, viewport } from '@/UI/RootLayout/RootLayout';

// With one root layout per language there is no single layout to render the 404 page in. The static export
// has a single 404.html, so it holds every language and picks the visitor's one before it paints
export default function GlobalNotFound() {
    return (
        <RootLayout
            lang='en'
            beforeContent={<script dangerouslySetInnerHTML={{ __html: detectLanguageScript }} />}
        >
            <NotFound />
        </RootLayout>
    );
}
