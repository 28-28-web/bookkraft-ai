// "One Page, One Fix: The Kindle Formatting Handbook" — which EPUB a plan gets.
//
// Shared by the download route (which enforces it) and the dashboard card
// (which only decides what to show). The route is the only thing that serves
// the files, and it never takes the edition from the request.
//
//   is_lifetime                          → full edition (all 100 fixes)
//   has_logic_bundle (Starter and Pro)   → sampler edition
//   has_full_access (retired Full tier)  → sampler edition
//   anything else, including accounts
//   that only bought retired credit packs → nothing; upgrade CTA
//
// The EPUBs live in private/downloads/, outside public/, so there is no
// static URL to share. next.config.mjs traces that folder into the
// standalone build for the route below.

export const REJECTED_BOOK = {
    title: 'Why Your Book Got Rejected',
    route: '/api/downloads/rejected-book',
    editions: {
        full: {
            file: 'why-your-book-got-rejected.epub',
            downloadName: 'Why-Your-Book-Got-Rejected.epub',
        },
    },
};

// null = no access | 'locked' = paid but 3-month wait not done | 'full' = serve file
export function rejectedBookAccessFor(profile, userCreatedAt) {
    if (!profile) return null;
    if (profile.is_lifetime) return 'full';
    if (profile.has_logic_bundle || profile.has_full_access) {
        const unlock = new Date(userCreatedAt);
        unlock.setMonth(unlock.getMonth() + 3);
        return new Date() >= unlock ? 'full' : 'locked';
    }
    return null;
}

export function rejectedBookUnlockDate(userCreatedAt) {
    const d = new Date(userCreatedAt);
    d.setMonth(d.getMonth() + 3);
    return d;
}

export const HANDBOOK = {
    title: 'One Page, One Fix: The Kindle Formatting Handbook',
    route: '/api/downloads/handbook',
    editions: {
        full: {
            file: 'kindle-formatting-handbook-full.epub',
            downloadName: 'One-Page-One-Fix-Kindle-Formatting-Handbook.epub',
            label: 'Full edition, all 100 fixes',
        },
        sampler: {
            file: 'kindle-formatting-handbook-sampler.epub',
            downloadName: 'One-Page-One-Fix-Sampler.epub',
            label: 'Sampler, 20 of the 100 fixes',
        },
    },
};

/** 'full' | 'sampler' | null for a users row (or the AuthProvider profile). */
export function handbookEditionFor(profile) {
    if (!profile) return null;
    if (profile.is_lifetime) return 'full';
    if (profile.has_logic_bundle || profile.has_full_access) return 'sampler';
    return null;
}
