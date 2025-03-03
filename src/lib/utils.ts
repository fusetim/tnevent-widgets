const PATH_SEPARATOR = "/";

export function getPath(path: string) {
    return import.meta.env.BASE_URL + PATH_SEPARATOR + path;
}