$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let id=$('.id').eq(btn);
       let doc=$('.doc').eq(btn);
       let no=$('.nom').eq(btn);
       let cl=$('.cla').eq(btn);
       let ra=$('.ra').eq(btn);
       let pe=$('.pe').eq(btn);
       
       
       let i=id.val();
       let d=doc.val();
       let n=no.val();
       let c=cl.val();
       let r=ra.val();
       let p=pe.val();
     
     
    
       //alert(i+"\n"+d+"\n"+n+"\n"+c+"\n"+r+"\n"+p);
    
    $.ajax({
    type:"POST",
    url:'/actualizarmasco',
    data:{
        ii:i,dd:d,nn:n,cc:c,rr:r,pp:p
    }
    
    });
        
    });
    
    });