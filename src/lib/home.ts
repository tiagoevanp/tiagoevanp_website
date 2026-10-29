import GroupsList from '@/providers/lib/GroupsList';
import ItemsList from '@/providers/lib/ItemsList';
import type { GroupItem } from '@/providers/SidebarProvider';

import { jobs } from './experience';
import type { Technology } from './technologies';

// Everything used in the current and previous jobs, deduplicated, so the home stack stays in sync with /experience
export const stack: Technology[] = [...new Set(jobs.slice(0, 2).flatMap((job) => job.technologies))];

// Each item needs a summary under `home.skill_docs_summaries.<title>` in both locales
export const featuredSkillDocs = [
    ItemsList.getItem('semantic'),
    ItemsList.getItem('aria'),
    ItemsList.getItem('state-management'),
].filter((item): item is GroupItem => item !== undefined);

// Until the skill-docs index lands (#8), "See all articles" opens the first article of the sidebar
const [firstSkillDoc] = Object.values(GroupsList.all).flat();

export const getAllSkillDocsPath = (lng: string) => `/skill-docs/${firstSkillDoc.href}/${lng}`;
