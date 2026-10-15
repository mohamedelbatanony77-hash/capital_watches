const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,fmt=n=>n.toLocaleString('en-US');
const P=[
{id:'p01',n:'Noir Chronograph',p:1890,o:2200,sp:['42 mm','Automatic chronograph','100 m','Black leather'],d:'A black PVD case with gold crowns and three recessed registers.'},
{id:'p02',n:'Aurum Dress Classic',p:1450,o:1700,sp:['39 mm','Automatic','50 m','Brown leather'],d:'A slim gold case and a sunburst champagne dial with baton markers.'},
{id:'p03',n:'Abyss Ceramic Diver',p:2250,o:2600,sp:['41 mm','Automatic','300 m','Ceramic bracelet'],d:'A black ceramic diver with a gold bezel and a screw-down crown.'},
{id:'p04',n:'Rose Skeleton Auto',p:2780,o:3100,sp:['42 mm','Skeleton automatic','100 m','Rubber'],d:'An open-worked dial showing the movement under a brushed rose-gold bezel.'},
{id:'p05',n:'Pearl Milanese',p:980,o:1150,sp:['32 mm','Quartz','30 m','Mesh bracelet'],d:'A mother-of-pearl dial on a soft rose-gold mesh bracelet.'},
{id:'p06',n:'Diamond Cuff',p:2150,o:2500,sp:['30 mm','Quartz','30 m','Gold cuff'],d:'A black dial framed by a diamond-set bezel and a polished gold cuff.'},
{id:'p07',n:'Deco Rectangle',p:1990,o:2300,sp:['29 x 40 mm','Manual wind','30 m','Black leather'],d:'A rectangular gold case set with diamonds on a black dial.'},
{id:'p08',n:'Eclipse Moonphase',p:3400,o:3800,sp:['29 x 40 mm','Manual wind, moonphase','30 m','Black leather'],d:'A moonphase sub-dial among gold stars. Limited to a small run.'},
{id:'a01',n:'Leather Watch Winder',p:420,d:'A single-watch winder in black leather with a gold clasp.'},
{id:'a02',n:'Noir Leather Strap',p:120,d:'Black leather with a gold buckle.'},
{id:'a03',n:'Gold Cufflinks',p:260,d:'Brushed gold cufflinks in a velvet tray.'},
{id:'a04',n:'Walnut Display Case',p:340,d:'A walnut case with a glass lid for three watches.'}];
const byId=id=>P.find(x=>x.id==id),T={m:['p01','p02','p03','p04','p08'],w:['p05','p06','p07','p08','p02'],l:['p08','p04','p07','p06','p03']};
let cart=2,cmp=[];const C={p01:1,p05:1};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(e.t);e.t=setTimeout(()=>e.classList.remove('on'),2200)}
const RG='<svg class="rg" viewBox="0 0 44 44" aria-hidden="true"><rect x=".5" y=".5" width="43" height="43" rx="21.5" pathLength="100"/></svg>';
const btn=(a,ic,tip,i)=>`<button data-a="${a}" data-tip="${tip}" style="--i:${i}" aria-label="${tip}">${RG}<i class="${ic}"></i></button>`;
const ARW=(c,l)=>`<button class="arw ${c}" aria-label="${l}"><svg class="rg" viewBox="0 0 54 54" aria-hidden="true"><rect x=".5" y=".5" width="53" height="53" rx="26.5" pathLength="100"/></svg><svg class="pg" viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="25.5" pathLength="100"/></svg><svg class="ar" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17M14 6l6 6-6 6"/></svg></button>`;
const card=id=>{const p=byId(id);return `<div class="cd" data-id="${id}"><figure><div class="pw"><img class="pi" src="assets/cut/${id}.webp" alt="${p.n}" loading="lazy"><i class="gl" style="--m:url(assets/cut/${id}.webp)"></i></div><div class="act">${btn('cart','fa-solid fa-cart-shopping','Add to cart',0)}${btn('wish','fa-regular fa-heart','Wishlist',1)}${btn('qv','fa-solid fa-magnifying-glass-plus','Quick view',2)}${p.sp?btn('cmp','fa-solid fa-code-compare','Compare',3):''}</div></figure><h4>${p.n}</h4><div class="pr"><b>$${fmt(p.p)}</b>${p.o?`<s>$${fmt(p.o)}</s>`:''}</div></div>`};
const vis=()=>innerWidth>1000?4:innerWidth>600?2:1;
function carousel(root,ids){
 root.innerHTML=`<div class="cw">${ARW('l','Previous')}<div class="vp"><div class="tr">${ids.map(card).join('')}</div></div>${ARW('r','Next')}</div>`;
 const tr=$('.tr',root);let i=0;const pg=()=>{const m=Math.max(1,ids.length-vis()+1);$$('.pg circle',root).forEach(c=>c.style.strokeDasharray=`${(i+1)/m*100} 100`)};pg();
 const go=d=>{const mx=Math.max(0,ids.length-vis());i=d>0?(i>=mx?0:i+1):(i<=0?mx:i-1);
  gsap.to(tr,{x:-i*tr.children[0].offsetWidth,duration:RM?0:.95,ease:'power3.inOut'});
  pg();gsap.fromTo(tr.children,{rotationY:d*-32,z:-90,transformPerspective:1200},{rotationY:0,z:0,duration:RM?0:1.1,stagger:.06,ease:'power3.out'})};
 $('.l',root).onclick=()=>go(-1);$('.r',root).onclick=()=>go(1);
 addEventListener('resize',()=>{i=Math.min(i,Math.max(0,ids.length-vis()));pg();gsap.set(tr,{x:-i*tr.children[0].offsetWidth})});
}
function openM(s){$(s).classList.add('on')}function closeM(){$$('.md').forEach(m=>m.classList.remove('on'))}
function qv(id){const p=byId(id);
 $('#qv .box').innerHTML=`<button class="x" data-a="close" aria-label="Close">&times;</button><div class="qv"><div class="zm"><div class="zi"><img src="assets/cut/${id}.webp" alt="${p.n}"></div></div><div class="qi" data-id="${id}"><h3>${p.n}</h3><div class="pr big"><b>$${fmt(p.p)}</b>${p.o?`<s>$${fmt(p.o)}</s>`:''}</div><p>${p.d}</p>${p.sp?`<ul><li><span>Case</span>${p.sp[0]}</li><li><span>Movement</span>${p.sp[1]}</li><li><span>Water resistance</span>${p.sp[2]}</li><li><span>Strap</span>${p.sp[3]}</li></ul>`:''}<button class="btn" data-a="cart">Add to cart</button></div></div>`;
 const z=$('#qv .zm'),zi=$('.zi',z);
 z.onmousemove=e=>{const r=z.getBoundingClientRect();zi.style.transformOrigin=`${(e.clientX-r.left)/r.width*100}% ${(e.clientY-r.top)/r.height*100}%`;zi.style.transform='scale(2.2)'};
 z.onmouseleave=()=>zi.style.transform='scale(1)';openM('#qv')}
function cmpBar(){const b=$('#cb');b.classList.toggle('on',cmp.length>0);$$('.cd').forEach(c=>{const k=$('[data-a=cmp]',c);k&&k.classList.toggle('on',cmp.includes(c.dataset.id))});
 b.innerHTML=cmp.map(id=>`<img src="assets/cut/${id}.webp" alt="${byId(id).n}">`).join('')+`<button class="btn sm" data-a="cmpgo" ${cmp.length<2?'disabled':''}>Compare ${cmp.length}/2</button><button class="x2" data-a="cmpclr" aria-label="Clear">&times;</button>`}
function cmpGo(){const [a,b]=cmp.map(byId),row=(l,f)=>`<tr><td>${l}</td><td>${f(a)}</td><td>${f(b)}</td></tr>`;
 $('#cm .box').innerHTML=`<button class="x" data-a="close" aria-label="Close">&times;</button><div class="cm"><h3>Compare watches</h3><table><tr><td></td><th><img src="assets/cut/${a.id}.webp" alt=""><br>${a.n}</th><th><img src="assets/cut/${b.id}.webp" alt=""><br>${b.n}</th></tr>${row('Price',x=>'$'+fmt(x.p))}${row('Case',x=>x.sp[0])}${row('Movement',x=>x.sp[1])}${row('Water resistance',x=>x.sp[2])}${row('Strap',x=>x.sp[3])}</table></div>`;openM('#cm')}
document.addEventListener('click',e=>{
 if(e.target.classList.contains('md'))return closeM();
 const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,id=b.closest('[data-id]')?.dataset.id;
 if(a=='close')closeM();
 if(a=='cart'){addCart(id)}
 if(a=='wish'){const on=b.classList.toggle('on'),ic=$('i',b);ic.className=on?'fa-solid fa-heart':'fa-regular fa-heart';toast(on?'Saved to wishlist':'Removed from wishlist')}
 if(a=='qv')qv(id);
 if(a=='cmp'){if(cmp.includes(id))cmp=cmp.filter(x=>x!=id);else{cmp.push(id);if(cmp.length>2)cmp.shift()}cmpBar()}
 if(a=='cmpclr'){cmp=[];cmpBar()}if(a=='cmpgo')cmpGo();if(a=='dq'){const k=b.closest('[data-id]').dataset.id;C[k]=Math.max(0,C[k]+ +b.dataset.d);cartRender()}if(a=='drm'){C[b.closest('[data-id]').dataset.id]=0;cartRender()}if(a=='dclose')drawer(false)});
addEventListener('keydown',e=>{if(e.key=='Escape'){closeM();drawer(false)}});
carousel($('#car1'),T.m);carousel($('#car2'),['a01','a02','a03','a04','p05','p03']);
$$('#tabs button').forEach(b=>b.onclick=()=>{$$('#tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');const r=$('#car1');
 gsap.to(r,{opacity:0,y:12,duration:.25,onComplete:()=>{carousel(r,T[b.dataset.t]);cmpBar();gsap.to(r,{opacity:1,y:0,duration:.55})}})});
const Q=[['Daniel Reeves','Collector, London','The Noir Chronograph arrived in a walnut box and <em>keeps better time than any watch I own.</em> The finish rivals pieces at three times the price.','t01','p01'],['Amira Haddad','Architect, Dubai','I bought the Pearl Milanese as a gift and ended up ordering a second for myself. <em>The concierge team answered every question within minutes.</em>','t02','p05'],['Lucas Meyer','Engineer, Zurich','The skeleton dial is the real thing. <em>I can see the movement work in daylight and in lamp light.</em>','t03','p04']];
let qi=0;const tm=$('#tm');
tm.innerHTML=`<div class="tmg"><div class="tmt"><h2>Customer Testimonial</h2><div class="qm" aria-hidden="true">&ldquo;</div><div class="qt" aria-live="polite"></div><div class="stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><div class="who"><div class="av"><span class="mono"></span><img alt=""><svg class="rg" viewBox="0 0 64 64" aria-hidden="true"><rect x=".5" y=".5" width="63" height="63" rx="31.5" pathLength="100"/></svg></div><div><b class="wn"></b><small class="wr"></small><span class="vb"><i class="fa-solid fa-circle-check"></i> Verified buyer</span></div></div><div class="tnav">${ARW('l','Previous')}<span class="cnt"></span>${ARW('r','Next')}</div></div><div class="tms"><div class="dial" aria-hidden="true"></div><div class="flr" aria-hidden="true"></div><img class="pp" alt=""><div class="pn"></div></div></div>`;
const wd=s=>{let e=0;return s.split(/(<\/?em>)/).map(t=>t=='<em>'?(e=1,''):t=='</em>'?(e=0,''):t.split(' ').filter(Boolean).map(w=>`<span class="w${e?' e':''}">${w}</span>`).join(' ')).join(' ')};
function fill(){const q=Q[qi],p=byId(q[4]);$('.qt',tm).innerHTML=wd(q[2]);$('.wn',tm).textContent=q[0];$('.wr',tm).textContent=q[1];
 const im=$('.av img',tm),mo=$('.av .mono',tm);im.style.display=q[3]?'':'none';mo.style.display=q[3]?'none':'';if(q[3]){im.src='assets/'+q[3]+'.jpg';im.alt=q[0]}else mo.textContent=q[0][0];
 const pp=$('.pp',tm);pp.src='assets/cut/'+q[4]+'.webp';pp.alt=p.n;$('.pn',tm).innerHTML=`<small>Purchased</small>${p.n}`;$('.cnt',tm).textContent=`0${qi+1} / 0${Q.length}`;
 $$('.pg circle',tm).forEach(c=>c.style.strokeDasharray=`${(qi+1)/Q.length*100} 100`)}
function show(d){const pp=$('.pp',tm);if(RM){fill();return}
 const go=()=>{fill();gsap.fromTo($$('.w',tm),{opacity:0,y:16},{opacity:1,y:0,stagger:.03,duration:.6,ease:'power3.out'});gsap.fromTo(pp,{x:d*140,scale:.75,opacity:0},{x:0,scale:1,opacity:1,duration:.9,ease:'power3.out'});gsap.fromTo('.tmt .stars,.tmt .who,.tmt .pn,.tms .pn',{opacity:0,y:10},{opacity:1,y:0,duration:.6,delay:.2,stagger:.08})};
 gsap.to($$('.w',tm),{opacity:0,y:-10,duration:.25,stagger:.01});gsap.to(pp,{x:-d*90,scale:.6,opacity:0,duration:.45,ease:'power2.in',onComplete:go})}
fill();$$('.arw',tm).forEach(b=>b.onclick=()=>{const d=b.classList.contains('r')?1:-1;qi=(qi+d+Q.length)%Q.length;show(d)});
$('#news').innerHTML=[['b01','Craftsmanship','Inside the watchmaker\'s bench'],['b02','Style guide','How to choose a strap that lasts'],['b03','Boutique','A walk through our flagship boutique']].map(n=>`<article><figure><img src="assets/${n[0]}.jpg" alt="${n[2]}" loading="lazy"></figure><small>${n[1]}</small><h3>${n[2]}</h3><a class="rm" href="#">Read more</a></article>`).join('');
$('#bur').onclick=()=>$('#menu').classList.toggle('open');
gsap.registerPlugin(ScrollTrigger);
addEventListener('scroll',()=>$('.nav').classList.toggle('sm',scrollY>40),{passive:true});
if(!RM){if(innerWidth>1000)ScrollTrigger.create({trigger:'.hero',start:'top top',end:'+=90%',pin:true,scrub:.6,onUpdate:s=>window.wtc&&window.wtc.ex(Math.sin(s.progress*Math.PI))});
 const rv=$$('.sh,.cat,.car,.tm,.news article,.ft div');gsap.set(rv,{opacity:0,y:50});
 ScrollTrigger.batch(rv,{start:'top 90%',once:true,onEnter:b=>gsap.to(b,{opacity:1,y:0,stagger:.12,duration:1.1,ease:'power3.out'})})}
/* ---------- 3D watch ---------- */
let intro=()=>{};
(function(){const c=$('#gl');let R;
 try{if(typeof THREE=='undefined')throw 0;R=new THREE.WebGLRenderer({canvas:c,antialias:true,alpha:true})}catch(e){document.body.classList.add('nogl');return}
 R.setPixelRatio(Math.min(devicePixelRatio,1.5));R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.2;
 const S=new THREE.Scene(),cam=new THREE.PerspectiveCamera(30,1,.1,60);cam.position.set(0,0,10.5);
 const E=new THREE.Scene();E.add(new THREE.Mesh(new THREE.SphereGeometry(20,32,16),new THREE.MeshBasicMaterial({color:0x15120c,side:THREE.BackSide})));
 [[0,8,4,12,3,0xfff1d6,3.2],[-9,1,3,3,9,0xffd9a0,2.6],[9,-1,2,3,8,0xffffff,1.8],[0,-8,5,12,2,0xc9a45c,1.4]].forEach(([x,y,z,w,h,col,k])=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(col).multiplyScalar(k),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);E.add(m)});
 S.environment=new THREE.PMREMGenerator(R).fromScene(E,.03).texture;
 const gold=new THREE.MeshStandardMaterial({color:0xd8b366,metalness:1,roughness:.2}),lea=new THREE.MeshStandardMaterial({color:0x151412,roughness:.55,metalness:0});
 const tex=new THREE.TextureLoader().load('assets/dial.jpg');tex.encoding=THREE.sRGBEncoding;tex.anisotropy=8;
 const O=new THREE.Group(),W=new THREE.Group();S.add(O);O.add(W);
 const add=(g,m,p=[0,0,0],r=[0,0,0],par=W)=>{const o=new THREE.Mesh(g,m);o.position.set(...p);o.rotation.set(...r);par.add(o);return o},X=Math.PI/2;
 add(new THREE.CylinderGeometry(1.04,1.04,.32,96),gold,[0,0,0],[X,0,0]);
 add(new THREE.TorusGeometry(.99,.075,24,128),gold,[0,0,.16]);
 add(new THREE.CircleGeometry(.93,96),new THREE.MeshStandardMaterial({map:tex,metalness:.35,roughness:.5}),[0,0,.172]);
 add(new THREE.CircleGeometry(.93,96),new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.1,roughness:0,metalness:0}),[0,0,.215]);
 add(new THREE.CylinderGeometry(.1,.1,.22,32),gold,[1.1,0,0],[0,0,X]);
 [[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([sx,sy])=>add(new THREE.BoxGeometry(.2,.55,.3),gold,[sx*.6,sy*1.0,-.01]));
 [1,-1].forEach(s=>add(new THREE.BoxGeometry(1.05,1.55,.12),lea,[0,s*1.78,-.16],[-s*.3,0,0]));
 const hand=(w,l,tail,k)=>{const g=new THREE.Group(),b=new THREE.BoxGeometry(w,l+tail,.018);b.translate(0,(l-tail)/2,0);const m=new THREE.Mesh(b,k||gold);g.add(m);g.position.z=.235;W.add(g);return g};
 const hh=hand(.075,.5,.08),mh=hand(.055,.78,.1),sh=hand(.016,.86,.2);
 add(new THREE.CylinderGeometry(.06,.06,.06,24),gold,[0,0,.26],[X,0,0]);
 const N=150,pa=new Float32Array(N*3);for(let i=0;i<N*3;i++)pa[i]=(Math.random()-.5)*(i%3==2?6:12);
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
 const dust=new THREE.Points(pg,new THREE.PointsMaterial({color:0xe6c987,size:.035,transparent:true,opacity:.65,depthWrite:false}));S.add(dust);
 const k=new THREE.DirectionalLight(0xffe2b0,1.6);k.position.set(4,5,7);S.add(k);const rim=new THREE.DirectionalLight(0xc9a45c,1.4);rim.position.set(-6,2,-4);S.add(rim);S.add(new THREE.AmbientLight(0xffffff,.15));
 const sz=()=>{const w=c.clientWidth,h=c.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.position.z=w/h<.8?14:10.5;cam.updateProjectionMatrix()};sz();addEventListener('resize',sz);
 let tx=0,ty=0,on=true;addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5)*2;ty=(e.clientY/innerHeight-.5)*2});
 new IntersectionObserver(([e])=>on=e.isIntersecting).observe($('.hero'));
 W.rotation.y=RM?0:Math.PI*2.5;W.scale.setScalar(RM?1:.4);W.visible=true;
 intro=()=>{if(RM)return;gsap.to(W.rotation,{y:0,duration:2.6,ease:'power4.out'});gsap.to(W.scale,{x:1,y:1,z:1,duration:2.2,ease:'power3.out'})};
 O.position.x=.2;const TAU=Math.PI*2;const base=W.children.map(o=>o.position.clone()),EX=[[0,0,-.2],[0,0,.3],[0,0,.08],[0,0,.8],[.5,0,0],[-.2,.3,0],[.2,.3,0],[-.2,-.3,0],[.2,-.3,0],[0,.55,-.1],[0,-.55,-.1],[0,0,.5],[0,0,.6],[0,0,.7],[0,0,.55]];let ex=0,exs=0;window.wtc={ex:v=>ex=v,mat:c=>{const t=new THREE.Color(c.color);gsap.to(gold.color,{r:t.r,g:t.g,b:t.b,duration:.6});gold.metalness=c.m;gold.roughness=c.r},strap:c=>{const t=new THREE.Color(c);gsap.to(lea.color,{r:t.r,g:t.g,b:t.b,duration:.6})}};
 let pr=0,fr=0,ft=0,lt=0;(function loop(t){requestAnimationFrame(loop);if(!on||document.hidden){pr=0;return}const dr=pr?t-pr:0;pr=t;if(fr<90){if(dr){ft+=dr;if(++fr==90&&ft/90>26){document.body.classList.add('lite');R.setPixelRatio(1);sz()}}}else if(t-lt<32)return;lt=t;t*=.001;
  O.rotation.y+=((RM?0:tx*.6)-.25+Math.min(scrollY,innerHeight)*.0025-O.rotation.y)*.06;O.rotation.x+=((RM?0:ty*.35)+.12-O.rotation.x)*.06;
  O.position.y=RM?0:Math.sin(t*.9)*.09;dust.rotation.y=t*.03;dust.position.y=Math.sin(t*.4)*.2;
  const d=new Date(),s=d.getSeconds()+d.getMilliseconds()/1000,m=d.getMinutes()+s/60,h=d.getHours()%12+m/60;
  sh.rotation.z=-s/60*TAU;mh.rotation.z=-m/60*TAU;hh.rotation.z=-h/12*TAU;exs+=(ex-exs)*.1;W.children.forEach((o,i)=>{const e=EX[i];if(e)o.position.set(base[i].x+e[0]*exs*2.2,base[i].y+e[1]*exs*2.2,base[i].z+e[2]*exs*2.2)});R.render(S,cam)})(0);
})();
/* ---------- intro ---------- */
function start(){const tl=gsap.timeline();
 tl.to('#pre b,#pre .ring',{opacity:0,duration:.4}).to('#pre',{yPercent:-100,duration:RM?0:1.1,ease:'power4.inOut'},'<.15').add(()=>{$('#pre')?.remove();setTimeout(intro,650)},'<.2')
 .from('.hero .in',{y:44,opacity:0,stagger:.14,duration:RM?0:1.1,ease:'power3.out'},'<.3')}
addEventListener('load',()=>setTimeout(start,RM?0:1200));

/* v2: nav rings + newsletter */
function rings(){$$('.menu>li>a,.ic a,.top a').forEach(a=>{let s=$('.rg',a);if(!s){s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','rg');s.setAttribute('aria-hidden','true');s.innerHTML='<rect pathLength="100"/>';a.appendChild(s)}
 const w=a.offsetWidth,h=a.offsetHeight,r=$('rect',s);if(!w)return;s.setAttribute('viewBox',`0 0 ${w} ${h}`);Object.entries({x:.5,y:.5,width:w-1,height:h-1,rx:h/2}).forEach(([k,v])=>r.setAttribute(k,v))})}
rings();addEventListener('resize',rings);document.fonts&&document.fonts.ready.then(rings);$('#bur').addEventListener('click',()=>setTimeout(rings,0));
$('#nlf').onsubmit=e=>{e.preventDefault();const b=$('.sub',e.target);b.classList.add('done');toast('Subscribed. Check your inbox.');setTimeout(()=>{b.classList.remove('done');e.target.reset()},2600)};

/* v4: top bar clock + product tilt */
const tick=()=>{const d=new Date();$('#ct').textContent=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});$('#ch').style.transform=`rotate(${(d.getHours()%12+d.getMinutes()/60)*30}deg)`;$('#cm').style.transform=`rotate(${d.getMinutes()*6}deg)`};tick();setInterval(tick,1000);
if(matchMedia('(hover:hover)').matches&&!RM){document.addEventListener('pointermove',e=>{const f=e.target.closest&&e.target.closest('.cd figure');if(!f)return;const r=f.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;f.style.setProperty('--rx',(-y*14)+'deg');f.style.setProperty('--ry',(x*18)+'deg');f.style.setProperty('--mx',x)});
 document.addEventListener('pointerout',e=>{const f=e.target.closest&&e.target.closest('.cd figure');if(f&&!f.contains(e.relatedTarget)){f.style.setProperty('--rx','0deg');f.style.setProperty('--ry','0deg');f.style.setProperty('--mx',0)}})}

/* v5: heart sparks */
(function(){const cr=$('.cr'),hr=$('.hrt');if(!cr||RM)return;cr.addEventListener('mouseenter',()=>{for(let i=0;i<10;i++){const s=document.createElement('span');s.className='spk';const a=Math.random()*6.28,r=14+Math.random()*18;s.style.setProperty('--dx',Math.cos(a)*r+'px');s.style.setProperty('--dy',Math.sin(a)*r-8+'px');hr.appendChild(s);setTimeout(()=>s.remove(),950)}})})();

/* v6: cart drawer, configurator, cursor, pause offscreen */
function cartRender(){const ids=Object.keys(C).filter(k=>C[k]>0),n=ids.reduce((s,k)=>s+C[k],0),tot=ids.reduce((s,k)=>s+C[k]*byId(k).p,0);$('#badge').textContent=n;$('#dt').textContent='$'+fmt(tot);
 $('#dl').innerHTML=ids.length?ids.map(k=>{const p=byId(k);return `<li data-id="${k}"><img src="assets/cut/${k}.webp" alt=""><div><b>${p.n}</b><span>$${fmt(p.p)}</span><div class="q"><button data-a="dq" data-d="-1" aria-label="Less">&minus;</button><em>${C[k]}</em><button data-a="dq" data-d="1" aria-label="More">+</button></div></div><button class="rm" data-a="drm" aria-label="Remove">&times;</button></li>`}).join(''):'<li class="em">Your cart is empty.</li>'}
function drawer(o){$('#drw').classList.toggle('on',o);$('#dsc').classList.toggle('on',o);if(o)$('#drw .dx').focus()}
function addCart(id){C[id]=(C[id]||0)+1;cartRender();gsap.fromTo('#badge',{scale:1.9},{scale:1,duration:.7,ease:'elastic.out(1,.4)'});toast(byId(id).n+' added to cart');drawer(true)}
cartRender();$('.ic a.bg').addEventListener('click',e=>{e.preventDefault();drawer(true)});$('#dsc').onclick=()=>drawer(false);$('#chk').onclick=()=>toast('Checkout is a demo in this build');
const CS={gold:{color:0xd8b366,m:1,r:.2},rose:{color:0xd9936f,m:1,r:.22},steel:{color:0xd3d7dc,m:1,r:.18},noir:{color:0x2a2a2e,m:.9,r:.35}};
$$('#cfg .sw').forEach(b=>b.onclick=()=>{if(!window.wtc)return;$$('.sw',b.parentElement).forEach(x=>{x.classList.remove('on');x.setAttribute('aria-pressed','false')});b.classList.add('on');b.setAttribute('aria-pressed','true');b.dataset.case?window.wtc.mat(CS[b.dataset.case]):window.wtc.strap(b.dataset.strap)});
(function(){if(!matchMedia('(hover:hover) and (pointer:fine)').matches||RM)return;const c=$('#cur');let x=0,y=0,tx=0,ty=0,run=false;
 const lp=()=>{x+=(tx-x)*.2;y+=(ty-y)*.2;c.style.transform=`translate3d(${x}px,${y}px,0)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.3)requestAnimationFrame(lp);else run=false};
 addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;c.classList.add('on');if(!run){run=true;requestAnimationFrame(lp)}});
 addEventListener('pointerover',e=>{const t=e.target;c.classList.toggle('v',!!t.closest('.cd figure'));c.classList.toggle('h',!!t.closest('a,button,input')&&!t.closest('.act'))});
 document.addEventListener('mouseleave',()=>c.classList.remove('on'))})();
new IntersectionObserver(([e])=>$('.tsec').classList.toggle('off',!e.isIntersecting)).observe($('.tsec'));
