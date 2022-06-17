//funcion propia de jquery
$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let doc=$('.doc').eq(btn);
       let ti=$('.ti').eq(btn);
       let no=$('.no').eq(btn);
       let ap=$('.ap').eq(btn);
       let co=$('.co').eq(btn);
       let te=$('.te').eq(btn);
       let se=$('.se').eq(btn);
       
    
       let d=doc.val();
       let t=ti.val();
       let n=no.val();
       let a=ap.val();
       let c=co.val();
       let e=te.val();
       let s=se.val();
    
       //alert(d+"\n"+t+"\n"+n+"\n"+a+"\n"+c+"\n"+e+"\n"+s);
    
    $.ajax({
    type:"POST",
    url:'/actualizarvet',
    data:{
        dd:d,tt:t,nn:n,aa:a,cc:c,ee:e,ss:s
    }
    
    });
        
    });
    
    });