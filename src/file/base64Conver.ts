/**
 * 将base64转换成blob数据后，方便使用URL.createObjectURL(imageBlobData)将blob数据转换成BlobUrl
 * @description: base64 to blob
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0];
  const mime = typeItem.match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

type PictureCompressOptionsType = {
  width?: number;  // 图片宽
  height?: number;  // 图片高
  quality?: number;  // 图像质量
  mineType?: string;
}
/**
 * 将图片url链接转换为base64
 * img url to base64
 * @param url
 */
export function urlToBase64(url: string, options: PictureCompressOptionsType = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>;
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.crossOrigin = '';
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject();
      }
      canvas.height = options.height || img.height;
      canvas.width = options.width || img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(options.mineType || 'image/png', options.quality || 1);
      canvas = null;
      resolve(dataURL);
    };
    img.src = url;
  });
}
