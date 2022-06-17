//funcion propia de jquery
$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let vid=$('.vid').eq(btn);
       let idp=$('.idp').eq(btn);
       let no=$('.no').eq(btn);
       let fe=$('.fe').eq(btn);
       
    
       let v=vid.val();
       let i=idp.val();
       let n=no.val();
       let f=fe.val();
    
      // alert(v+"\n"+i+"\n"+n+"\n"+f);
    
    $.ajax({
    type:"POST",
    url:'/actualizarven',
    data:{
        vv:v,ii:i,nn:n,ff:f
    }
    
    });
        
    });
    
    });