const navToggle=document.querySelector('[data-nav-toggle]');
const navMenu=document.querySelector('[data-nav-menu]');
if(navToggle&&navMenu){
  navToggle.addEventListener('click',()=>{
    navMenu.classList.toggle('open');
    if(navMenu.classList.contains('open')){
      navMenu.style.display='flex';
    }else{
      navMenu.style.display='';
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(href&&href.startsWith('#')){
      const el=document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    }
  });
});

const form=document.querySelector('#contact-form');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    alert(`Thanks ${data.name||'there'}! We'll reply to ${data.email||'your inbox'} soon.`);
    form.reset();
  });
}

const welcome=document.querySelector('[data-welcome]');
if(welcome){
  const showKey='dc_welcome_shown';

  if(sessionStorage.getItem(showKey)!=='1'){
    welcome.style.display='flex';
    document.body.style.overflow='hidden';
    const first=welcome.querySelector('.picker a');
    if(first)first.focus();

    const close=()=>{
      sessionStorage.setItem(showKey,'1');
      welcome.style.display='none';
      document.body.style.overflow='';
    };

    const skip=welcome.querySelector('[data-welcome-close]');
    if(skip)skip.addEventListener('click',close);

    welcome.addEventListener('click',e=>{
      if(e.target===welcome)close();
    });

    document.addEventListener('keydown',e=>{
      if(e.key==='Escape')close();
    });
  }
}
