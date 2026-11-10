(function(){var b=document.querySelector('.burger');if(!b)return;b.addEventListener('click',function(){var o=document.body.classList.toggle('open');b.setAttribute('aria-expanded',o)});document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.body.classList.remove('open');b.setAttribute('aria-expanded',false)}})})();
(function(){var b=document.querySelector('.wr .box'),p=document.querySelector('.pics-r');if(!b||!p)return;function f(){p.style.setProperty('--boxh',(b.offsetHeight-36)+'px')}f();window.addEventListener('resize',f);if(document.fonts)document.fonts.ready.then(f)})();
(function(){var n=document.querySelector('.name.blurin');if(!n)return;var d=false;function go(){if(d)return;d=true;n.classList.add('go')}if(document.fonts&&document.fonts.ready){document.fonts.ready.then(go)}else go();setTimeout(go,1500)})();
(function(){var src=document.querySelector('.m-pics');if(!src)return;var figs=[].slice.call(src.querySelectorAll('figure'));if(!figs.length)return;var B=document.body;var es=document.documentElement.lang==='es';
var urls=figs.map(function(f){return f.getAttribute('data-full')});var title=(document.querySelector('.box .ttl')||{}).textContent||'';
var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
var h='<div class="strip">';urls.forEach(function(u,i){h+='<img data-src="'+u+'" alt="'+title.replace(/"/g,'')+' '+(i+1)+'" draggable="false">'});h+='</div>';
h+='<div class="lb-meta"><span class="lb-n">01</span><span class="lb-of">/'+String(urls.length).padStart(2,'0')+'</span><span class="lb-t">'+title+'</span></div>';
h+='<button class="x" aria-label="'+B.dataset.close+'">'+(es?'cerrar':'close')+'</button><div class="cur" aria-hidden="true"></div>';lb.innerHTML=h;B.appendChild(lb);
var strip=lb.querySelector('.strip'),ims=[].slice.call(strip.querySelectorAll('img')),num=lb.querySelector('.lb-n'),cur=lb.querySelector('.cur'),x=lb.querySelector('.x'),idx=0,lock=false;
function load(i){var im=ims[i];if(im&&!im.src){im.src=im.dataset.src}}
function center(i,smooth){var im=ims[i];strip.scrollTo({left:im.offsetLeft-(strip.clientWidth-im.offsetWidth)/2,behavior:smooth?'smooth':'auto'})}
function go(i){i=Math.max(0,Math.min(ims.length-1,i));idx=i;[i-1,i,i+1,i+2].forEach(load);center(i,true);mark()}
function mark(){num.textContent=String(idx+1).padStart(2,'0');ims.forEach(function(im,k){im.classList.toggle('act',k===idx)})}
strip.addEventListener('scroll',function(){var c=strip.scrollLeft+strip.clientWidth/2,b=0,d=1e9;ims.forEach(function(im,k){var m=im.offsetLeft+im.offsetWidth/2,dd=Math.abs(m-c);if(dd<d){d=dd;b=k}});if(b!==idx){idx=b;[b-1,b,b+1,b+2].forEach(load);mark()}},{passive:true});
function open(i,from){ims.forEach(function(im,k){if(Math.abs(k-i)<3)load(k)});lb.classList.add('on');B.classList.add('lb-open');idx=i;mark();
 var im=ims[i];function fly(){center(i,false);if(!from)return;var a=from.getBoundingClientRect(),b=im.getBoundingClientRect();if(!b.width)return;im.style.transition='none';im.style.transform='translate('+(a.left-b.left)+'px,'+(a.top-b.top)+'px) scale('+(a.width/b.width)+')';im.style.transformOrigin='0 0';im.getBoundingClientRect();im.style.transition='';im.style.transform=''}
 if(im.complete&&im.naturalWidth)fly();else im.addEventListener('load',fly,{once:true});requestAnimationFrame(function(){lb.classList.add('vis')})}
function close(){lb.classList.remove('vis');setTimeout(function(){lb.classList.remove('on');B.classList.remove('lb-open')},450)}
document.querySelectorAll('.pics figure,.m-pics figure').forEach(function(f){f.addEventListener('click',function(){open(+f.getAttribute('data-i'),f.querySelector('img'))})});
x.addEventListener('click',function(e){e.stopPropagation();close()});
strip.addEventListener('click',function(e){var r=e.clientX<innerWidth/3?-1:1;if(r<0&&idx===0)return;if(r>0&&idx===ims.length-1){close();return}go(idx+r)});
lb.addEventListener('wheel',function(e){e.preventDefault();var d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(lock||Math.abs(d)<8)return;lock=true;go(idx+(d>0?1:-1));setTimeout(function(){lock=false},650)},{passive:false});
lb.addEventListener('mousemove',function(e){cur.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)';var onX=e.target===x;cur.classList.toggle('hide',onX);var left=e.clientX<innerWidth/3;cur.textContent=left?(idx===0?'':(es?'← anterior':'← previous')):(idx===ims.length-1?(es?'cerrar':'close'):(es?'siguiente →':'next →'))});
lb.addEventListener('mouseleave',function(){cur.classList.add('hide')});lb.addEventListener('mouseenter',function(){cur.classList.remove('hide')});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();else if(e.key==='ArrowRight')go(idx+1);else if(e.key==='ArrowLeft')go(idx-1)})})();
