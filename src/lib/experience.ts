import { ExternalLinks } from './ExternalLinks';

export type Job = {
    id: string;
    url?: string;
    technologies: string[];
};

// Newest first. Each id needs matching keys under `experience.<id>` in both locales.
export const jobs: Job[] = [
    {
        id: 'ducon',
        url: ExternalLinks.ducon,
        technologies: [
            'javascript',
            'typescript',
            'react',
            'react_router',
            'shadcn_ui',
            'php',
            'laravel',
            'mysql',
            'docker',
            'vps',
        ],
    },
    {
        id: 'rocket_chat',
        url: ExternalLinks.rocketchat,
        technologies: [
            'javascript',
            'typescript',
            'react',
            'meteor',
            'node',
            'mongodb',
            'jest',
            'react_testing_library',
            'playwright',
            'git',
        ],
    },
    {
        id: 'canopus',
        url: ExternalLinks.canopus,
        technologies: [
            'javascript',
            'php',
            'python',
            'dotnet',
            'postgresql',
            'mysql',
            'oracledb',
            'fullstack',
            'git',
        ],
    },
];
