import { ExternalLinks } from './ExternalLinks';
import { Technologies, type Technology } from './technologies';

export type Job = {
    id: string;
    url?: string;
    technologies: Technology[];
};

// Newest first. Each id needs matching keys under `experience.<id>` in both locales.
export const jobs: Job[] = [
    {
        id: 'ducon',
        url: ExternalLinks.ducon,
        technologies: [
            Technologies.javascript,
            Technologies.typescript,
            Technologies.react,
            Technologies.reactRouter,
            Technologies.shadcnUi,
            Technologies.php,
            Technologies.laravel,
            Technologies.mysql,
            Technologies.docker,
            Technologies.vps,
        ],
    },
    {
        id: 'rocket_chat',
        url: ExternalLinks.rocketchat,
        technologies: [
            Technologies.javascript,
            Technologies.typescript,
            Technologies.react,
            Technologies.reactHookForm,
            Technologies.tanstackQuery,
            Technologies.storybook,
            Technologies.meteor,
            Technologies.node,
            Technologies.mongodb,
            Technologies.jest,
            Technologies.reactTestingLibrary,
            Technologies.mocha,
            Technologies.playwright,
            Technologies.git,
        ],
    },
    {
        id: 'canopus',
        url: ExternalLinks.canopus,
        technologies: [
            Technologies.javascript,
            Technologies.extjs,
            Technologies.php,
            Technologies.yii,
            Technologies.python,
            Technologies.flask,
            Technologies.c,
            Technologies.csharp,
            Technologies.dotnet,
            Technologies.postgresql,
            Technologies.mysql,
            Technologies.oracledb,
            Technologies.git,
        ],
    },
];
