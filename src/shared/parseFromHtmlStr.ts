export const parseFromHtmlStr = (htmlStr: string) =>
  new DOMParser().parseFromString(htmlStr, "text/html").body
    .firstChild as HTMLElement;
