document.querySelector('#showHideChBox').addEventListener('change',($event)=>{
   if($event.target.checked){
    document.querySelector('.sidepanel').classList.add('sidepanel_collasped');
   }
   else{
    document.querySelector('.sidepanel').classList.remove('sidepanel_collasped');
   }
});

