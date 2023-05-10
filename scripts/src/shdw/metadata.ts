import { ShadowFile } from "@shadow-drive/sdk"

export interface Metadata {
  name: string
  symbol: string
  description: string
  image: string // url
  external_url: string
}

export function build(
  name: string,
  imageUrl: string // TODO;
): ShadowFile {
  const url = "https://rgb.industries/";
  const meta = {
    name: name,
    symbol: "PIXEL",
    description: "rgb pixel primitive token",
    image: imageUrl,
    external_url: url
  } as Metadata;
  const json = JSON.stringify(meta);
  const textEncoder = new TextEncoder();
  const bytes = textEncoder.encode(json);
  const buffer = Buffer.from(bytes);
  return {
    name: "meta.json",
    file: buffer
  }
}
