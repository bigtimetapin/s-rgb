export interface Metadata {
    name: string
    symbol: string
    description: string
    image: string // url
    external_url: string
}

export function build(
    imageUrl: string
): File {
    const url = "https://rgb.industries/";
    const meta = {
        name: "rgb.industries",
        symbol: "RGB",
        description: "proof of work pixel art",
        image: imageUrl,
        external_url: url
    } as Metadata;
    const json = JSON.stringify(meta);
    const textEncoder = new TextEncoder();
    const bytes = textEncoder.encode(json);
    const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8"
    });
    return new File([blob], "meta.json");
}

export async function get(url: string): Promise<Metadata> {
    const fetched = await fetch(url)
        .then(response => response.json());
    return {
        name: fetched.name,
        symbol: fetched.symbol,
        description: fetched.description,
        image: fetched.image,
        external_url: fetched.external_url
    }
}
