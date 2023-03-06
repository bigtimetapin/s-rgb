import domtoimage from 'dom-to-image';

export function domToImage() {
    domtoimage.toJpeg(document.getElementById('s-rgb-pixel-grid'), {quality: 1.00})
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 's-rgb.jpeg';
            link.href = dataUrl;
            link.click();
        });
}
