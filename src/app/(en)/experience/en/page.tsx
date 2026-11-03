import { experienceAlternates, experiencePath, pageMetadata } from '@/lib/seo';
import { Experience } from '@/UI/Experience/Experience';
import { ExperienceJsonLd } from '@/UI/Experience/ExperienceJsonLd';

export const metadata = pageMetadata({
    path: experiencePath('en'),
    lng: 'en',
    title: 'Experience',
    description: 'Tiago\'s professional experience as a full-stack engineer, with the companies, roles '
        + 'and technologies of each job, plus education and languages.',
    alternates: experienceAlternates(),
});

export default function Page() {
    return <>
        <ExperienceJsonLd lng='en' />
        <Experience />
    </>;
}
