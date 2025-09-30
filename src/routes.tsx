import { createBrowserRouter } from 'react-router';

import { App, Home, SkillDocs } from './views';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            { index: true, Component: Home },
            {
                path: 'skill-docs', Component: SkillDocs, children: [
                    { path: 'html', Component: () => { return <div></div>; } },
                    { path: 'css', Component: () => { return <div></div>; } },
                    { path: 'js-ts', Component: () => { return <div></div>; } },
                ],
            },
        ],
    },
]);
