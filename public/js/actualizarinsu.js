$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let id=$('.ins').eq(btn);
       let ip=$('.pro').eq(btn);
       let is=$('.ser').eq(btn);
       let no=$('.nom').eq(btn);
       let fe=$('.fec').eq(btn);
      
       
       let i=id.val();
       let p=ip.val();
       let s=is.val();
       let n=no.val();
       let f=fe.val();
     
    
     //  alert(i+"\n"+p+"\n"+s+"\n"+n+"\n"+f);
    
    $.ajax({
    type:"POST",
    url:'/actualizarinsu',
    data:{
        ii:i,pp:p,ss:s,nn:n,ff:f
    }
    
    });
        
    });
    
    });