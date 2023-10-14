import { checkArgsArray } from "../utils";
import { IBase64Encode, IFileSize } from "./types";

export class Numerics {
  videoDuration(s: string) {
    if (!s) return "00:00";
    const secNum = parseInt(s, 10); // don't forget the second param
    let hours: string | number = Math.floor(secNum / 3600);
    let minutes: string | number = Math.floor((secNum - hours * 3600) / 60);
    let seconds: string | number = secNum - hours * 3600 - minutes * 60;

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${(hours !== "00" ? `${hours}:` : "") + minutes}:${seconds}`;
  }

  fileSize(value: number) {
    const _number = 1024;
    if (value < _number) return value + "bytes";
    else if (value >= _number && value < 1048576)
      return (value / _number).toFixed(1) + "KB";
    else if (value >= 1048576) return (value / 1048576).toFixed(1) + "MB";
  }

  clamp(n: number, min: number, max: number) {
    if (n < min) {
      return min;
    }

    if (n > max) {
      return max;
    }
    return n;
  }

  shortenLargeNumber(num: number) {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}G`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return num;
  }

  /**
   * Clones the given `array`, moves the item to a new position in the array,
   * and then returns the new `array`. The given `array` is not mutated.
   *
   * **Note:** If negative, it will begin that many elements from the end.
   *
   * @param {FileList} [files] - The source Array.
   * @param {number} size - The file size (e.g., 0.5[KB], 1[MB], 4[MB]), default 3[MB].
   * @param {Object} options - The index of where to move the item.
   * @returns {Promise} Returns `Promise<Array>`.
   * @example
   *
   * const input = ["a", "b", "c"];
   * arrayMoveImmutable(input, 1, 2);
   * // => ["a", "c", "b"];
   */
  public calculateSizeFiles(
    files: FileList,
    size: number = 3,
    options: {},
  ): Promise<IFileSize> {
    checkArgsArray(files, "The FileList parameter must be an array.");

    const BYTES = 1024;
    const SIZES = Math.round(size * (BYTES * BYTES));
    return new Promise(resolve => {
      const rejectList: IFileSize["rejectList"] = [];
      const resolveList: IFileSize["resolveList"] = [];
      const dataFiles = [...files];

      dataFiles.forEach(item => {
        if (item && item.size <= SIZES) {
          resolveList.push({
            file: item,
            src: URL.createObjectURL(item),
          });
        } else {
          rejectList.push({
            name: item.name,
            size: `This image weighs ${this.fileSize(item.size)}`,
          });
        }
      });
      resolve({ resolveList, rejectList });
    });
  }

  public toBlob(url: string): Promise<File> {
    return new Promise(resolve => {
      this.base64Encode(url).then(res => {
        const byteString = atob(res.dataUrl);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        // write the array buffer to blob
        const blob = new Blob([ab], { type: "image/" + res.type });

        const formData = new FormData();
        formData.append("file", blob, res.name);
        resolve(formData.get("file") as File);
      });
    });
  }
  private base64Encode(url: string): Promise<IBase64Encode> {
    const re = new RegExp(".(gif|jpg|jpeg|tiff|png|ico)$", "i");
    const name = /[^(/|\\)]*$/.exec(url)?.[0] as string;
    const type = re.test(name) ? re.exec(name)?.[0].replace(".", "") : "jpg";

    return new Promise(resolve => {
      const image = new Image();
      const canvas = document.createElement("canvas");

      const dataUrl = canvas.toDataURL("image/" + type);
      image.onload = function () {
        // draw canvas
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext("2d")?.drawImage(image, 0, 0);

        resolve({
          name: name,
          type: type,
          dataUrl: dataUrl.split(",")[1],
        });
      };
      image.onerror = function () {
        const msg = "'file' no fount.";
        alert(msg);
        console.error(msg);
      };
      image.crossOrigin = "anonymous";
      image.referrerPolicy = "unsafe-url";
      image.src = url;
    });
  }
}
