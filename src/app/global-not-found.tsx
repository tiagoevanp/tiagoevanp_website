import { NotFound } from '@/UI/NotFound/NotFound';
import { RootLayout } from '@/UI/RootLayout/RootLayout';

export { metadata, viewport } from '@/UI/RootLayout/RootLayout';

// With one root layout per language there is no single layout to render the 404 page in
export default function GlobalNotFound() {
    return <RootLayout lang='en'><NotFound /></RootLayout>;
}
