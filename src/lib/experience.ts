import { ExternalLinks } from './ExternalLinks';
import { Technologies, type Technology } from './technologies';

export type WorkMode = 'remote' | 'onsite' | 'hybrid';

export type Job = {
    id: string;
    url?: string;
    // ISO months (YYYY-MM). Both ends count, so Dec 2025 – Jul 2026 is 8 months
    start: string;
    end: string;
    workMode: WorkMode;
    technologies: Technology[];
};

// The start is only known to the year. The end is the expected graduation month
export const education = { start: '2019', end: '2027-12' };

// ISO 639-1 codes, most fluent first. Each needs a key under `experience.languages.<code>` in both locales
export const spokenLanguages = ['pt', 'en', 'es'] as const;

// The "At a glance" figures besides the years. Each repeats a <b> metric from the Rocket.Chat highlights
// (users: highlight 0, pull_requests: 2, components: 4), so change both together.
// Each id needs `experience.glance.<id>.value` and `.label` in both locales
export const glanceStats = ['users', 'pull_requests', 'components'] as const;

const toMonthIndex = (month: string) => {
    const [year, monthOfYear] = month.split('-').map(Number);

    return year * 12 + monthOfYear - 1;
};

export const getDuration = ({ start, end }: Pick<Job, 'start' | 'end'>) => {
    const months = toMonthIndex(end) - toMonthIndex(start) + 1;

    return { years: Math.floor(months / 12), months: months % 12 };
};

// Whole years worked, counting a month once when two jobs overlap and leaving out the gaps between them
export const getYearsOfExperience = () => {
    const months = new Set(jobs.flatMap(({ start, end }) => Array.from(
        { length: toMonthIndex(end) - toMonthIndex(start) + 1 },
        (_, i) => toMonthIndex(start) + i,
    )));

    return Math.floor(months.size / 12);
};

// Newest first. Each id needs matching keys under `experience.<id>` in both locales.
export const jobs: Job[] = [
    {
        id: 'ducon',
        url: ExternalLinks.ducon,
        start: '2025-12',
        end: '2026-07',
        workMode: 'onsite',
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
        start: '2020-10',
        end: '2025-09',
        workMode: 'remote',
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
        start: '2017-09',
        end: '2020-10',
        workMode: 'onsite',
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
