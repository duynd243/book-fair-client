import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import slugify from 'slugify';

export function isInViewPort(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    const html = document.documentElement;
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth)
    );
}
const defaultLocaleFormat = { locale: vi };
export function getFormattedDate(
    dateStr: string | undefined,
    localeFormat: {
        locale: Locale;
    } = defaultLocaleFormat
) {
    const date = dateStr ? new Date(dateStr) : undefined;
    return {
        dayOfWeek: date ? format(date, 'eeee', localeFormat) : 'N/A',
        day: date ? format(date, 'dd', localeFormat) : 'N/A',
        month: date ? format(date, 'MM', localeFormat) : 'N/A',
        year: date ? format(date, 'yyyy', localeFormat) : 'N/A',
        fullDate: date ? format(date, 'eeee, dd/MM/yyyy', localeFormat) : 'N/A',
    };
}
const slugifyOptions = {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true,
};
export function getSlug(str?: string) {
    return slugify(str || '', slugifyOptions);
}

export function getSlugUrl(
    rootPath?: string,
    title?: string,
    id?: number | string
) {
    return `${rootPath}/${getSlug(title)}/${id}`;
}
