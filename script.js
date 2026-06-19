const intro = document.getElementById("intro");
const main = document.getElementById("main");
const music = document.getElementById("music");
const btn = document.getElementById("musicBtn");
const langBtn = document.getElementById("langBtn");

let currentLang = "en";

window.onload = () => {
  intro.style.display = "flex";
  main.style.display = "none";
};

intro.onclick = () => {
  intro.style.display = "none";
  main.style.display = "block";

  fadeInMusic();

  document.querySelectorAll(".section").forEach((sec, i) => {
    setTimeout(() => sec.classList.add("show"), i * 250);
  });

  setTimeout(() => {
    document.querySelector("h1").classList.add("show");
  }, 400);

  langBtn.style.display = "block";
};

/* 🎵 الصوت */
function fadeInMusic(){
  music.volume = 0;
  music.play().catch(()=>{});
  let v=0;
  let i=setInterval(()=>{
    if(v<1){v+=0.05;music.volume=v;}
    else clearInterval(i);
  },100);
}

function fadeOutMusic(){
  let v=music.volume;
  let i=setInterval(()=>{
    if(v>0){v-=0.05;music.volume=v;}
    else{music.pause();clearInterval(i);}
  },100);
}

btn.onclick=()=>{
  if(music.paused){
    fadeInMusic();
    btn.innerHTML="🔊";
  }else{
    fadeOutMusic();
    btn.innerHTML="🔇";
  }
};

/* 🌐 تغيير اللغة (الحل الصح هنا) */
langBtn.onclick = () => {
  currentLang = currentLang === "en" ? "ar" : "en";

  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-en]").forEach(el => {
    el.classList.add("fade");

    setTimeout(() => {
      el.innerHTML = el.getAttribute("data-" + currentLang);

      // 👇 أهم سطر (حل المشكلة)
      el.style.direction = currentLang === "ar" ? "rtl" : "ltr";

      el.classList.remove("fade");
    }, 150);
  });

  langBtn.textContent = currentLang === "en" ? "AR" : "EN";
};

/* ⏳ العداد */
const t=new Date("May 14, 2026 20:00").getTime();

setInterval(()=>{
  let d=t-Date.now();
  upd("days",d/864e5);
  upd("hours",d/36e5%24);
  upd("minutes",d/6e4%60);
  upd("seconds",d/1e3%60);
},1000);

function upd(id,v){
  let e=document.getElementById(id);
  v=Math.floor(v);
  e.textContent=v;
}

/* ❤️ القلوب */
document.addEventListener("click",(e)=>{
  let h=document.createElement("div");
  h.className="heart";
  h.innerHTML="❤️";
  h.style.left=e.clientX+"px";
  h.style.top=e.clientY+"px";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),1000);
});