export const camelToKebabCase = (name: string = "") => {
    return name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}