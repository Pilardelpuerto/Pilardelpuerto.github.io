(function(){var b=document.querySelector('.burger');if(!b)return;b.addEventListener('click',function(){var o=document.body.classList.toggle('open');b.setAttribute('aria-expanded',o)});document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.body.classList.remove('open');b.setAttribute('aria-expanded',false)}})})();
(function(){var b=document.querySelector('.wr .box'),p=document.querySelector('.pics-r');if(!b||!p)return;function f(){p.style.setProperty('--boxh',(b.offsetHeight-36)+'px')}f();window.addEventListener('resize',f);if(document.fonts)document.fonts.ready.then(f)})();
(function(){var n=document.querySelector('.name.blurin');if(!n)return;var d=false;function go(){if(d)return;d=true;n.classList.add('go')}if(document.fonts&&document.fonts.ready){document.fonts.ready.then(go)}else go();setTimeout(go,1500)})();
(function(){var src=document.querySelector('.m-pics');if(!src)return;var figs=[].slice.call(src.querySelectorAll('figure'));if(!figs.length)return;var urls=figs.map(function(f){return f.getAttribute('data-full')});var B=document.body;
var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
lb.innerHTML='<img alt=""><button class="x" aria-label="'+B.dataset.close+'">×</button><button class="pv" aria-label="'+B.dataset.prev+'">←</button><button class="nx" aria-label="'+B.dataset.next+'">→</button><div class="cnt"></div>';document.body.appendChild(lb);
var im=lb.querySelector('img'),cnt=lb.querySelector('.cnt'),cur=0,alt=figs[0].querySelector('img').alt;
function show(i){cur=(i+urls.length)%urls.length;im.classList.remove('ok');im.onload=function(){im.classList.add('ok')};im.src=urls[cur];im.alt=alt;cnt.textContent=(cur+1)+' / '+urls.length;var a=new Image();a.src=urls[(cur+1)%urls.length]}
function open(i){show(i);lb.classList.add('on');B.classList.add('lb-open');lb.querySelector('.x').focus()}
function close(){lb.classList.remove('on');B.classList.remove('lb-open')}
document.querySelectorAll('.pics figure,.m-pics figure').forEach(function(f){f.addEventListener('click',function(){open(+f.getAttribute('data-i'))})});
lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=function(e){e.stopPropagation();show(cur-1)};lb.querySelector('.nx').onclick=function(e){e.stopPropagation();show(cur+1)};
im.onclick=function(e){e.stopPropagation();show(cur+1)};lb.addEventListener('click',function(e){if(e.target===lb)close()});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();else if(e.key==='ArrowRight')show(cur+1);else if(e.key==='ArrowLeft')show(cur-1)});
var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(cur+(dx<0?1:-1));x0=null})})();
