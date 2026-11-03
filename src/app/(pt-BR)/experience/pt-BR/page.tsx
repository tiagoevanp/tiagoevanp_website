import { experienceAlternates, experiencePath, pageMetadata } from '@/lib/seo';
import { Experience } from '@/UI/Experience/Experience';

export const metadata = pageMetadata({
    path: experiencePath('pt-BR'),
    lng: 'pt-BR',
    title: 'Experiência',
    description: 'A experiência profissional de Tiago como engenheiro full-stack, com as empresas, os cargos '
        + 'e as tecnologias de cada emprego, além de formação e idiomas.',
    alternates: experienceAlternates(),
});

export default function Page() {
    return <Experience />;
}
