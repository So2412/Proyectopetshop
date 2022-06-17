//funcion propia de jquery
$(document).ready(function(){

    $('.btneli').on('click',function(){
    
     let btn= $('.btneli').index(this);
     let cit=$('.cit').eq(btn);
    
     let c=cit.val();   

   // alert(c);
    
$.ajax({
type:"POST",
url:'/eliminarcita',
data:{
    cc:c
}
    
});
        
});
    
});