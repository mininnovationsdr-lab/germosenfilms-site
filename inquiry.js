const inquiryForm=document.querySelector('#inquiry-form');
const serviceField=document.querySelector('#service');
const collectionField=document.querySelector('#collection');
const statusField=document.querySelector('#form-status');
function filterCollections(){
 [...collectionField.options].forEach(option=>{option.hidden=!!option.dataset.for&&!!serviceField.value&&serviceField.value!=='both'&&option.dataset.for!==serviceField.value;option.disabled=option.hidden;});
 if(collectionField.selectedOptions[0]?.disabled)collectionField.value='';
}
serviceField.addEventListener('change',filterCollections);
document.querySelectorAll('.package-contact').forEach(link=>{
 link.removeAttribute('target');link.href='#contacto';
 link.addEventListener('click',()=>{serviceField.value=link.dataset.type;filterCollections();collectionField.value=link.dataset.packageEs;document.querySelector('#full-name').focus({preventScroll:true});});
});
document.addEventListener('languagechange',()=>{document.querySelectorAll('.package-contact').forEach(a=>{a.href='#contacto';a.removeAttribute('target');});statusField.textContent='';});
inquiryForm.addEventListener('submit',event=>{
 event.preventDefault();
 if(!inquiryForm.reportValidity())return;
 const en=document.documentElement.lang==='en';
 const value=id=>document.getElementById(id).value.trim();
 const date=value('event-date');
 const dateText=date?new Intl.DateTimeFormat(en?'en-US':'es-DO',{dateStyle:'long'}).format(new Date(date+'T12:00:00')):(en?'To be confirmed':'Por definir');
 const labels=en?['Name','Partner','Email','Phone','Celebration','Date','Venue / city','Collection','Our story']:['Nombre','Pareja','Correo','Teléfono','Celebración','Fecha','Lugar / ciudad','Colección','Nuestra historia'];
 const values=[value('full-name'),value('partner'),value('email'),value('phone'),serviceField.selectedOptions[0].textContent,dateText,value('venue'),collectionField.selectedOptions[0].textContent,value('story')];
 const message=(en?'Hi Adonis! We would like to inquire about Germosen Films.':'¡Hola, Adonis! Queremos consultar disponibilidad con Germosen Films.')+'\n\n'+values.map((v,i)=>v?labels[i]+': '+v:'').filter(Boolean).join('\n');
 const link=document.createElement('a');link.href='https://wa.me/18492271821?text='+encodeURIComponent(message);link.target='_blank';link.rel='noopener noreferrer';document.body.append(link);link.click();link.remove();
 statusField.textContent=en?'Your message is ready in WhatsApp. Send it there to complete your inquiry.':'Tu mensaje está preparado en WhatsApp. Envíalo allí para completar la consulta.';
});
