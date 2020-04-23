((doc, win) => {
  let lib = window['lib']||{};
  let flexible = lib.flexible||{};
  isPc() ? pc(doc, win) : flexibleMobile(doc, win,flexible);
})(document, window);

function pc(doc, win) {
  const docEl = doc.documentElement || doc.getElementsByTagName("html")[0];
  docEl.style.fontSize = "40px";
}

// 移动端
function flexibleMobile(doc, win,flexible) {
  let docEl = doc.documentElement;
  let metaEl = doc.querySelector('meta[name="viewport"]');
  let flexibleEl = doc.querySelector('meta[name="flexible"]');
  let dpr = 0;
  let scale = 0;
  let tid;

  if (metaEl) {
      console.warn('将根据已有的meta标签来设置缩放比例');
      let match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
      if (match) {
          scale = parseFloat(match[1]);
          dpr = parseInt(1 / scale);
      }
  } else if (flexibleEl) {
    let content = flexibleEl.getAttribute('content');
      if (content) {
        let initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
        let maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
          if (initialDpr) {
              dpr = parseFloat(initialDpr[1]);
              scale = parseFloat((1 / dpr).toFixed(2));
          }
          if (maximumDpr) {
              dpr = parseFloat(maximumDpr[1]);
              scale = parseFloat((1 / dpr).toFixed(2));
          }
      }
  }

  if (!dpr && !scale) {
    let isIPhone = win.navigator.appVersion.match(/iphone/gi);
    let devicePixelRatio = win.devicePixelRatio;
      if (isIPhone) {
          // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
          if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
              dpr = 3;
          } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
              dpr = 2;
          } else {
              dpr = 1;
          }
      } else {
          // 其他设备下，仍旧使用1倍的方案
          dpr = 1;
      }
      scale = 1 / dpr;
  }

  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
      metaEl = doc.createElement('meta');
      metaEl.setAttribute('name', 'viewport');
      metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
      if (docEl.firstElementChild) {
          docEl.firstElementChild.appendChild(metaEl);
      } else {
        let wrap = doc.createElement('div');
          wrap.appendChild(metaEl);
          doc.write(wrap.innerHTML);
      }
  }

  function refreshRem(){
    let width = docEl.getBoundingClientRect().width;
      if (width / dpr > 540) {
          width = 540 * dpr;
      }
      let rem = width / 10;
      docEl.style.fontSize = rem + 'px';
      flexible.rem = win.rem = rem;
  }

  win.addEventListener('resize', function() {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function(e) {
      if (e.persisted) {
          clearTimeout(tid);
          tid = setTimeout(refreshRem, 300);
      }
  }, false);

  if (doc.readyState === 'complete') {
      doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
      doc.addEventListener('DOMContentLoaded', function(e) {
          doc.body.style.fontSize = 12 * dpr + 'px';
      }, false);
  }


  refreshRem();

  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;
  flexible.rem2px = function(d) {
    let val = parseFloat(d) * flexible.rem;
      if (typeof d === 'string' && d.match(/rem$/)) {
          val += 'px';
      }
      return val;
  }
  flexible.px2rem = function(d) {
    let val = parseFloat(d) / flexible.rem;
      if (typeof d === 'string' && d.match(/px$/)) {
          val += 'rem';
      }
      return val;
  };

  (function() {
    if (/iphone/.test(navigator.userAgent.toLowerCase())) {
      let timer = null;
      let timer2 = null;
      document.body.style.top = 0;
      window.addEventListener("focusin", e => {
        let org = e.srcElement||e.target;
        if(org.type=='radio'||org.type=='submit'||org.type=='checkbox'){
          return;
        }
        clearTimeout(timer2);
        timer = setTimeout(function() {
          let eleTop = e.target.getBoundingClientRect().bottom+Math.abs(parseInt(document.body.style.top));//元素底部距离顶部的高度--如果第一次键盘弹起导致元素整体上移，需要将上移的距离加上
          let clientHeight = document.documentElement.clientHeight; //屏幕高度
          let keyboardHeight = parseInt(clientHeight*0.45);//因为获取不到键盘高度，所以默认键盘高度是屏幕0.45倍
          //如果元素距离底部的距离小于了键盘高度，那么键盘弹起
          if((clientHeight-eleTop)<keyboardHeight){
            //弹起高度等于键盘高度减去元素距离底部的高度
               let upspringHeight = parseInt(keyboardHeight-(clientHeight-eleTop));
               document.body.style.top = -upspringHeight+'px';
          }
        }, 1);
      });
      window.addEventListener("focusout", e => {
        // document.body.style.top = 0
        let org = e.srcElement||e.target;
        if(org.type=='radio'||org.type=='submit'||org.type=='checkbox'){
          return;
        }
        timer2 = setTimeout(function() {
          document.body.style.top = 0;
          clearTimeout(timer2);
        }, 20);
        clearTimeout(timer);
        classified();
      });
    } else {
      window.addEventListener("resize", function() {
        if (
          document.activeElement.tagName == "INPUT" ||
          document.activeElement.tagName == "TEXTAREA"
        ) {
          window.setTimeout(function() {
            document.activeElement.scrollIntoViewIfNeeded();
            classified();
          }, 0);
        }
      });
    }
  })();
}
//pc端
function isPc() {
  let is_mobi =
    navigator.userAgent
      .toLowerCase()
      .match(
        /(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
      ) != null;
  if (is_mobi) {
    return false;
  }
  return true;
}
//初始化高度
function classified() {
  const timer = setTimeout(() => {
    const scrollHeight =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    clearTimeout(timer);
  }, 200);
}