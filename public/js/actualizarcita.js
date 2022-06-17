$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let ci=$('.cit').eq(btn);
       let se=$('.ser').eq(btn);
       let ma=$('.mas').eq(btn);
       let ve=$('.vet').eq(btn);
       let co=$('.cor').eq(btn);
       let te=$('.tel').eq(btn);
       let ho=$('.hor').eq(btn);
       let fe=$('.fec').eq(btn);
       
       let i=ci.val();
       let s=se.val();
       let m=ma.val();
       let v=ve.val();
       let c=co.val();
       let t=te.val();
       let h=ho.val();
       let f=fe.val();
     
    
      // alert(i+"\n"+s+"\n"+m+"\n"+v+"\n"+c+"\n"+t+"\n"+h+"\n"+f);
    
    $.ajax({
    type:"POST",
    url:'/actualizarcita',
    data:{
        ii:i,ss:s,mm:m,vv:v,cc:c,tt:t,hh:h,ff:f
    }
    
    });
        
    });
    
    });