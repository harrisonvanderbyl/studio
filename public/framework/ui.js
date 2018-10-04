var menuobject = {
    name:'mainmenu',
    menu:true,
    menuobjects:
    [
    {name:'Actors',
    menu:true,
    menuobjects:[
        {
            name:'ADD',
            classes:'bg-success rounded text-center',
            add:true,
            onclic:()=>{loadui({name:'newobject_0',object:new Vistype('newobject_0'),obj:true},'Actorsddmen',2)}
        }

    ]


},
    {name:'Images',
    menu:true,
    menuobjects:[
        {
            name:'NEWIMAGE',
            classes:'bg-success rounded text-center',
            add:true,
            onclic:()=>{loadui({name:'newimg_0',img:'#000000',image:true},'Imagesddmen',2)}
        }

    ]

},
    {name:'Methods'}
    ]

}
function adduitodiv(cls){
    $('.'+cls).append('<div class="ui rounded"></div>');
    loadui(menuobject,'ui',0);
}
function loadui(uie,app,ind){
    let hasbutten = "";
    let extraclasses='';
    if(uie.menu){
        hasbutten = '<div class="dd'+uie.name+' col-1">(+)</div>';
        
    }
    if(uie.classes){
        extraclasses+=uie.classes;
    }
    $('.'+app).append('<div class="row menuitem'+uie.name+' menu"><div class="col-'+ind+'"></div>'+hasbutten+'<div class="col-5 '+extraclasses+'">'+uie.name+'</div></div><div class="'+uie.name+'ddmen" style="display:none"></div>');
    let funca = ()=>{};
    if(uie.add){
    funca = ()=>{ uie.onclic() };

    }
    if(uie.obj){

        funca = ()=>{openeditor(uie.object)};
    }
    if(uie.image){

        funca = ()=>{openimageeditor(uie.name)};
    }
    $('.menuitem'+uie.name).click(()=>{
        
        if($('.dd'+uie.name).text()=='(+)'){
        $('.dd'+uie.name).text('(-)');
        $('.'+uie.name+'ddmen').slideDown("slow");
    
    }else{
    if($('.dd'+uie.name).text()=='(-)'){
        $('.dd'+uie.name).text('(+)');
        $('.'+uie.name+'ddmen').slideUp("slow");


    }


    }
    console.log('clicked');
   funca();
    
   
    });
    if(uie.menuobjects){
        for(let i = 0; i < uie.menuobjects.length;i++){
        
            loadui(uie.menuobjects[i],uie.name+'ddmen',ind+1);
        }
    }
    
    
}
openeditor = (obj)=>{
console.log('editor open');

$('.editor').html('');
$('.editor').append('<div class="row rounded">'+
                        '<div class="col row">'+
                            '<div class="col-3 btn">Name: </div>'+
                            '<input class="nameedit" type="text" class="col form-control" readonly value="'+obj.name+'" >'+
                        '</div>'+
                        '<div class="col-1 btn" onclick=\'$(\".nameedit\").attr(\"readonly\", (_, attr)=>{return (!attr)});\'>🖌</div>'+
                    '</div>');
 $('.editor').append('<div class="row rounded">'+
    '<div class="col row">'+
    '<div class="col-3 btn">Image: </div>'+
    '<input type="color" class="col-3"'+
    '</div>'+
    '<div class="col-1 btn">🖌</div>'+
    '</div>');
    $('.editor').append('<div class="row rounded">'+
    '<div class="col row">'+
    '<div class="col btn">Step: </div>'+
    
    '</div>'+
    '<div class="col-1 btn">🖌</div>'+
    '</div>');
    $('.editor').append('<div class="row rounded">'+
    '<div class="col row">'+
    '<div class="col btn">Create: </div>'+
    
    '</div>'+
    '<div class="col-1 btn">🖌</div>'+
    '</div>');
   
}
openimageeditor = (obj)=>{
    console.log('editor open');
    $('.editor').html('');
    $('.editor').append();
       
    }