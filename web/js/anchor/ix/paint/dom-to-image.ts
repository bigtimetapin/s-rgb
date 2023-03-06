import domtoimage from 'dom-to-image';

export async function domToImage(): Promise<File> {
    return domtoimage.toJpeg(document.getElementById('s-rgb-pixel-grid'), {quality: 1.00})
        .then(async function (dataUrl) {
            const blob = await dataUrlToBlob(
                dataUrl
            );
            return new File(
                [blob],
                "s-rgb.jpeg"
            )
        });
}

async function dataUrlToBlob(url) {
    return fetch(url).then(response => response.blob())
}
