//funcion propia de jquery
$(document).ready(function(){

    $('.btneli').on('click',function(){
    
     let btn= $('.btneli').index(this);
     let id=$('.id').eq(btn);
    
     let i=id.val();   

   // alert(i);
    
$.ajax({
type:"POST",
url:'/eliminarservi',
data:{
    ii:i
}
    
});
        
});
    
});