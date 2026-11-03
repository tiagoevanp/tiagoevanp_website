import { experienceAlternates, experiencePath, pageMetadata } from '@/lib/seo';
import { Experience } from '@/UI/Experience/Experience';
import { ExperienceJsonLd } from '@/UI/Experience/ExperienceJsonLd';

export const metadata = pageMetadata({
    path: experiencePath('pt-BR'),
    lng: 'pt-BR',
    title: 'Experiência',
    description: 'A experiência profissional de Tiago como engenheiro full-stack, com as empresas, os cargos '
        + 'e as tecnologias de cada emprego, além de formação e idiomas.',
    alternates: experienceAlternates(),
});

export default function Page() {
    return <>
        <ExperienceJsonLd lng='pt-BR' />
        <Experience />
    </>;
}
