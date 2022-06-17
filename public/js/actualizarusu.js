//funcion propia de jquery
$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let doc=$('.doc').eq(btn);
       let ti=$('.ti').eq(btn);
       let no=$('.no').eq(btn);
       let ap=$('.ap').eq(btn);
       let us=$('.us').eq(btn);
       let co=$('.co').eq(btn);
       let ro=$('.ro').eq(btn);
       
    
       let d=doc.val();
       let t=ti.val();
       let n=no.val();
       let a=ap.val();
       let u=us.val();
       let p=co.val();
       let r=ro.val();
    
       //alert(d+"\n"+t+"\n"+n+"\n"+a+"\n"+u+"\n"+p+"\n"+r);
    
    $.ajax({
    type:"POST",
    url:'/actualizarusu',
    data:{
        dd:d,tt:t,nn:n,aa:a,uu:u,pp:p,rr:r
    }
    
    });
        
    });
    
    });