type StyleFunction<T = string> = (value: T) => ColoredProxy;
type OutputFunction = (...args: Array<any>) => Array<any>;
type StyleMethods = {
    bold: ColoredProxy;
    italic: ColoredProxy;
    underline: ColoredProxy;
    strikethrough: ColoredProxy;
    font: StyleFunction;
    size: StyleFunction;
    bg: StyleFunction;
    radius: StyleFunction;
    color: StyleFunction;
    padding: StyleFunction;
    border: StyleFunction;
    style: StyleFunction;
    log: ColoredProxy;
    warn: ColoredProxy;
    error: ColoredProxy;
};
type ColoredProxy = {
    [key: string]: ColoredProxy;
} & StyleMethods & OutputFunction;
export declare let chroma: ColoredProxy;
export {};
