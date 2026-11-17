const IMG={s1:"images/s1.jpg",s2:"images/s2.jpg",s3:"images/s3.jpg",s4:"images/s4.jpg",s5:"images/s5.jpg"};
const PRODUCTS=[
 {n:"abt pro club",img:"s1",c:"abt pro club",dy:0},
 {n:"abt apparel",img:"s2",c:"abt apparel",dy:0},
 {n:"legalize",img:"s3",c:"legalize",dy:2},
 {n:"crop shirt",img:"s4",c:"crop shirt",dy:-1},
 {n:"hassuru shirt",img:"s5",c:"hassuru shirt",dy:3}
];
let cat="all",q="";
const grid=document.getElementById('grid'),empty=document.getElementById('empty');
function render(){
  grid.innerHTML="";let n=0;
  PRODUCTS.forEach(p=>{
    if((cat!=="all"&&p.c!==cat)||(q&&!p.n.toLowerCase().includes(q)))return;
    n++;
    const d=document.createElement('div');d.className='prod';
    d.innerHTML=`<img src="${IMG[p.img]}" alt="${p.n}"><div class="n">${p.n}</div><div class="p">₱299</div><button class="btn buy" style="margin-top:${11+p.dy}px">buy</button>`;
    d.querySelector('.buy').onclick=()=>toast(p.n+" added to cart");
    grid.appendChild(d);
  });
  empty.style.display=n?'none':'block';
}
document.querySelectorAll('.cat').forEach(b=>b.onclick=()=>{
  cat=b.dataset.c;document.querySelectorAll('.cat').forEach(x=>x.classList.toggle('on',x===b));render();
});
document.getElementById('search').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();render()});
render();

/* scaling: design is 1152px wide, scales to the window */
const page=document.getElementById('page'),wrap=document.getElementById('wrap');
function fit(){const s=document.documentElement.clientWidth/1152;page.style.transform=`scale(${s})`;wrap.style.height=(2576*s)+'px'}
addEventListener('resize',fit);fit();

/* navigation */
function go(id){const el=document.getElementById(id);const s=document.documentElement.clientWidth/1152;scrollTo({top:el.offsetTop*s,behavior:'smooth'})}
document.querySelectorAll('[data-go]').forEach(a=>a.onclick=()=>go(a.dataset.go));
document.getElementById('shopNow').onclick=()=>go('shop');

/* toast */
let tt;function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),1800)}

/* contact form */
document.getElementById('panel').addEventListener('submit',e=>{
  e.preventDefault();
  const f=[fn,fe,fm];let ok=true;
  f.forEach(x=>x.classList.remove('err'));
  if(!fn.value.trim()){fn.classList.add('err');ok=false}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fe.value.trim())){fe.classList.add('err');ok=false}
  if(!fm.value.trim()){fm.classList.add('err');ok=false}
  if(!ok){toast("Please fill in all fields correctly");return}
  toast("Message sent! Thank you.");e.target.reset();
});
