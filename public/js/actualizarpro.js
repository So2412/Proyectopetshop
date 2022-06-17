//funcion propia de jquery
$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let idd=$('.idd').eq(btn);
       let ca=$('.ca').eq(btn);
       let ma=$('.ma').eq(btn);
       let pr=$('.pr').eq(btn);
       let di=$('.di').eq(btn);
       
    
       let i=idd.val();
       let c=ca.val();
       let m=ma.val();
       let p=pr.val();
       let d=di.val();
    
       //alert(i+"\n"+c+"\n"+m+"\n"+p+"\n"+d);
    
    $.ajax({
    type:"POST",
    url:'/actualizarpro',
    data:{
        ii:i,cc:c,mm:m,pp:p,dd:d
    }
    
    });
        
    });
    
    });