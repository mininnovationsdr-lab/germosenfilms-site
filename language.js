let language='es';
try{language=localStorage.getItem('germosen-language')==='en'?'en':'es';}catch{}
const translatedNodes=[...document.querySelectorAll('[data-en]')].map(el=>({el,es:el.innerHTML,en:el.dataset.en}));
const attributeTranslations={
 'Germosen Films, inicio':'Germosen Films, home',
 'Navegación principal':'Main navigation',
 'Germosen Films, películas de bodas':'Germosen Films, wedding films',
 'Adonis Paulino, fundador de Germosen Films':'Adonis Paulino, founder of Germosen Films',
 'Cerrar película':'Close film'
};
const translatedAttributes=[];
document.querySelectorAll('[aria-label],[alt]').forEach(el=>{
 ['aria-label','alt'].forEach(attr=>{
  const es=el.getAttribute(attr);if(!es)return;
  let en=attributeTranslations[es];
  if(es.startsWith('Ver película de '))en='Watch the film of '+es.slice(16).replace(' y ',' & ');
  if(es.startsWith('Ver teaser de '))en='Watch the teaser of '+es.slice(14).replace(' y ',' & ');
  if(es.startsWith('Fotograma de la película de '))en='A still from the film of '+es.slice(27).replace(' y ',' & ');
  if(es.startsWith('Fotograma del teaser de '))en='A still from the teaser of '+es.slice('Fotograma del teaser de '.length).replace(' y ',' & ');
  if(en)translatedAttributes.push({el,attr,es,en});
 });
});
function setLanguage(value){
 language=value==='en'?'en':'es';
 document.documentElement.lang=language;
 translatedNodes.forEach(item=>{item.el.innerHTML=item[language];});
 translatedAttributes.forEach(item=>item.el.setAttribute(item.attr,item[language]));
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));
 document.title=language==='es'?'Germosen Films — Películas de bodas por Adonis Paulino':'Germosen Films — Wedding films by Adonis Paulino';
 document.querySelector('meta[name="description"]').content=language==='es'?'Películas de bodas por Adonis Paulino. Explora nuestras colecciones de Boda y Pre Boda y consulta disponibilidad.':'Wedding films by Adonis Paulino. Explore our Wedding and Pre Wedding collections and check availability.';
 document.querySelector('.contact-button').href='https://wa.me/18492271821?text='+encodeURIComponent(language==='es'?'Hola, Adonis. Nos gustaría conocer más sobre Germosen Films. Nuestra boda será el ':'Hi Adonis, we would love to learn more about Germosen Films. Our wedding date is ');
 document.querySelectorAll('.package-contact').forEach(a=>{
  const name=language==='es'?a.dataset.packageEs:a.dataset.packageEn;
  const category=a.dataset.type==='wedding'?(language==='es'?'Bodas':'Wedding'):(language==='es'?'Pre Boda':'Pre Wedding');
  const message=language==='es'?`Hola, Adonis. Nos interesa la colección ${name} (${category}). ¿Podrías confirmarnos disponibilidad? Nuestra fecha es `:`Hi Adonis, we are interested in the ${name} collection (${category}). Could you confirm availability? Our date is `;
  a.href='https://wa.me/18492271821?text='+encodeURIComponent(message);
 });
 try{localStorage.setItem('germosen-language',language);}catch{}
 document.dispatchEvent(new Event('languagechange'));
}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
const categoryTabs=[...document.querySelectorAll('[data-category]')];
function selectCategory(tab){
 categoryTabs.forEach(b=>{const selected=b===tab;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!selected;});
}
categoryTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectCategory(tab));
 tab.addEventListener('keydown',e=>{
  let next;
  if(e.key==='ArrowRight'||e.key==='ArrowLeft')next=categoryTabs[1-index];
  if(e.key==='Home')next=categoryTabs[0];if(e.key==='End')next=categoryTabs[1];
  if(next){e.preventDefault();selectCategory(next);next.focus();}
 });
});
selectCategory(categoryTabs[0]);setLanguage(language);
