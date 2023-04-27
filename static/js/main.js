

document.addEventListener('click', (e)=>{
   if(e.target.classList.contains('close')){
      e.target.parentElement.style.transform = 'translateY(6px)';
   }
   if(e.target.classList.contains('show')){
      e.target.parentElement.parentElement.nextElementSibling.style.transform = 'translateY(-164px)';
   }
   if(e.target.classList.contains('show-menu-order')){
      e.preventDefault()
      e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.style.transform= 'translateY(0)';
   }
})