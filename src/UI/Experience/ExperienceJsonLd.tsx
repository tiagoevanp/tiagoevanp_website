import { experienceJsonLd } from '@/lib/jsonLd';

type ExperienceJsonLdProps = {
    lng: string;
};

// A server component, so the data is in the static HTML for crawlers that don't run scripts.
// < is escaped so no string in the data can close the script element
export const ExperienceJsonLd = ({ lng }: ExperienceJsonLdProps) => <script
    type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceJsonLd(lng)).replace(/</g, '\\u003c') }}
/>;
