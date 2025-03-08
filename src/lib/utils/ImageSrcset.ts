export const IMAGE_MIME_TYPES = [
    { ext: "jpg", mime: "image/jpeg", altExt: ["jpeg"] },
    { ext: "png", mime: "image/png", altExt: [] },
    { ext: "webp", mime: "image/webp", altExt: [] },
    { ext: "gif", mime: "image/gif", altExt: [] },
    { ext: "svg", mime: "image/svg+xml", altExt: [] },
    { ext: "avif", mime: "image/avif", altExt: [] },
    { ext: "avif", mime: "image/avif", altExt: [] },
];

export function getMimeTypeFromExt(ext: string): string {
    ext = ext.toLowerCase();
    const mimeType = IMAGE_MIME_TYPES.find(mimeType => mimeType.ext === ext);
    if (mimeType) {
        return mimeType.mime;
    }
    return "";
}

export function getExtFromMimeType(type: string): string[] {
    const ext = IMAGE_MIME_TYPES.find(mimeType => mimeType.mime === type);
    if (ext) {
        return [ext.ext, ...ext.altExt];
    }
    return [];
}

export interface ImageSrc {
    src: string;
    mimeType: string;
}

export class ImageSrcset {
    src : ImageSrc[] = [];
    alt : string = "";

    constructor(srcTemplate: string, srcExts: string[]);
    constructor(srcTemplate: string, srcExts: string[], alt: string = "") {
        this.alt = alt;
        this.src = srcExts.map(ext => {
            return {
                src: srcTemplate.replace(".ext", "."+ext),
                mimeType: getMimeTypeFromExt(ext)
            };
        });
    };

    getSrcset(): ImageSrc[] {
        return this.src;
    }

    getMainSrc(): ImageSrc {
        return this.src[0];
    }

    getAlt(): string {
        return this.alt;
    }
}
