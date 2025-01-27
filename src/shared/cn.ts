export const cn = (...classes: any[]): string => {
  let styles = "";

  for (const className of classes) {
    if (!className) continue;

    styles += ` ${className}`;
  }

  return styles;
};
