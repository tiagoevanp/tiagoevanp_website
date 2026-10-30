import ItemsList from '@/providers/lib/ItemsList';
import type { GroupItem } from '@/providers/SidebarProvider';

import { jobs } from './experience';
import type { Technology } from './technologies';

// Everything used in the current and previous jobs, deduplicated, so the home stack stays in sync with /experience
export const stack: Technology[] = [...new Set(jobs.slice(0, 2).flatMap((job) => job.technologies))];

export const featuredSkillDocs = [
    ItemsList.getItem('semantic'),
    ItemsList.getItem('aria'),
    ItemsList.getItem('state-management'),
].filter((item): item is GroupItem => item !== undefined);
