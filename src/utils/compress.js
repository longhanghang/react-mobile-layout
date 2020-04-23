/*
        三个参数
        file：一个是文件(类型是图片格式)，
        w：一个是文件压缩的后宽度，宽度越小，字节越小
        objDiv：一个是容器或者回调函数
        photoCompress()
        */
function photoCompress(file, w = { quality: 0.2 }) {
  return new Promise(resolve => {
    let ready = new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload = function() {
      let re = this.result;
      canvasDataURL(re, w, blob => {
        const fl = new File([blob], "file.jpg");
        resolve(fl);
      });
    };
  });
}

function canvasDataURL(path, obj, callback) {
  let img = new Image();
  img.src = path;
  img.onload = function() {
    let that = this;
    // 默认按比例压缩
    let w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || w;
    h = obj.height || w / scale;
    if (w > 4000 || h > 4000) {
      if (w > h) {
        w = 3500;
        h = w / scale;
      } else {
        h = 3500;
        w = h * scale;
      }
    }

    let quality = 0.7; // 默认图片质量为0.7
    //生成canvas
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    // 创建属性节点
    let anw = document.createAttribute("width");
    anw.nodeValue = w;
    let anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    // const blob = canvas.toBlob("image/jpeg", { quality });
    // console.log(blob.size);
    // 回调函数返回base64的值
    // callback(blob);

    const base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后质量
    const bytes = window.atob(base64.split(",")[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: "image/jpeg" });
    callback(blob);
    console.log("压缩后的图片大小", blob.size);
  };
}

// async function blobToFile(bl) {
//   return new File([bl], "file.jpeg");
// }

export default photoCompress;
