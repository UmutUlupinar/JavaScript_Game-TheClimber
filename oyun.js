//mobile check

let mobilmi = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) mobilmi = true;})(navigator.userAgent||navigator.vendor||window.opera);

//setup the base canvas

var c =document.createElement("canvas");  
c.width=window.innerWidth;
c.height=window.innerHeight;                                //canvas c nesnesini pencerenin boyutuna g??re ayarlar.

document.body.appendChild(c);                               //body c'ye g??re ayarland??
var ctx =c.getContext("2d");                                //2 boyutlu ??izimler yapabilmek i??in ctx nesnesi olu??turuldu

var pts=[];
while(pts.length < 254){
    while(pts.includes(val=Math.floor(Math.random() * 255)));
        pts.push(val);   
}                                                           //hem tekil hem de 255 adet elemanl?? array ol??turuldu
pts.push(pts[0]);                                           //pts[0] eleman?? son eleamana da atand??. D??md??z ??izgi olmas?? engellendi

var lerp =(a,b,t) => a+(b-a) * (1-Math.cos(t*Math.PI))/2;   //a'dan b'ye t kadar ad??mda ??izgi ??izilmesi sa??layacak fonksiyon

var noise= x =>{
    x=x*0.01 % 254;                                         //??nceki y koordinat?? ile ??imdiki y koordinat?? aras??ndaki fark??n?? a????r??l??ktan kurtar??r.
    return lerp(pts[Math.floor(x)],pts[Math.ceil(x)], x - Math.floor(x));
}

//init for draw environment
var bgcolor="#ff4301";                                      //background rengi
var forecolor="#4a3f35";                                    // ??nplan rengi
var linecolor="#2f2519";                                    // ??izgi rengi
var linewidth=5;                                            //??izgi geni??li??i
var offset=-10;                                             //??izimin ba??lad?????? yer  //ekran d??????ndan ba??latt??k.
//init of game parameters
var yRatio=0.6;                                             //??izgi s??kl?????? frekans?? //engebe ayarlamadaki temel parametre
var t=0;                                                    //zaman de??i??kenimiz. Oyunu zorla??t??r??rken kullan??lacak parametre
var speed=0;                                                //zeminin ak???? h??z??
var playing = true;                                         //oyun durumu olup olmad??????n?? kontrol eder. 

//Keyboard init
var k = {ArrowUp:0, ArrowLeft:0,ArrowRight:0,Space:0}

//player (truck & moves)
var player= new function(){
    this.x=c.width/2;                                       //Ara?? x koordinat??
    this.y=50;                                              //Ara?? y koordinat??
    this.truck=new Image();                                 //Ara?? image tan??mlamas??
    this.truck.src="t.png";
   
    this.rot=0;                                             //Arac??n y??nelim a????s??
    this.ySpeed=0;                                          //Arac??n yer??ekimine ba??l?? h??z??
    this.rSpeed=0;                                          //Arac??n y??nelim a????s??n??n de??i??imi
    

    //Interface
    this.StartBtn=new Image();
    this.StartBtn.src="buttonStart.png";
    this.leftBtn = new Image();
    this.leftBtn.src = "arrowLeft.png";
    this.rightBtn = new Image();
    this.rightBtn.src = "arrowRight.png";
    this.fireBtn = new Image();
    this.fireBtn.src = "barsVertical.png";

    this.drawInterface = function(){
        if(playing){
            // interface draw
                if(mobilmi){                                  //oyun aktif ve mobil cihazsa butonlar yerle??tirilir.
                    ctx.drawImage(this.leftBtn,20,c.height - 90,70,70);     //Mobildeki butonlar??n yerle??imi
                    ctx.drawImage(this.rightBtn,110,c.height - 90,70,70);
                    ctx.drawImage(this.fireBtn,c.width-90,c.height - 90,70,70);
                }}
                else{                                         //oyun bitmi??se. Cihaz farketmeksizin bu g??r??nt?? verilir.
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = "64px Impact";
                ctx.fillStyle = "white";
                ctx.fillText("YANDIN ??IK", c.width / 2, c.height / 3);
                ctx.drawImage(this.StartBtn,(c.width / 2) - 25, (c.height / 3) + 50,50,50);
                    }
    }

    this.draw=function(){
        
        var p1=(c.height*0.9)-noise(this.x+t)* yRatio;         //e??im ??izgisinin ba??lang???? konumu
        var p2=(c.height*0.9)-noise(this.x+t+5)* yRatio;       //e??im ??izgisinin 5 ad??m sonraki konumu

        var gnd=0;
        var offsetTruck=40;                                      //Ara?? image'in orta noktas?? ile tekerleklerin taban?? aras?? px
        var wheelY=p1-offsetTruck;                             
        var wheelY2=p2-offsetTruck;
        if(wheelY>this.y){                                     //araba havadaysa;
            this.ySpeed+=0.1;                                  //a??a???? do??ru h??z??n?? artt??r.
        }else{                                                 //araba yerdeyse;
            this.ySpeed-=this.y-(wheelY);                      //a??a???? do??ru h??z?? fark kadar k??????lt
            this.y=wheelY;                                       
            gnd=1;                                             //art??k yerdeyiz.
        }
        
        //Accident control
        if(!playing || gnd && Math.abs(this.rot) > Math.PI *0.5 ){  //Devrilme durumu
            playing=false;   
            k.ArrowUp = 1;                                  
            this.x -= speed*4;                                  
        }

        var angle= Math.atan2((wheelY2)-this.y,(this.x+5)-this.x); //y??nelim a????s??n?? hesaplar
        
        if(gnd && playing){                                    //Yerle biti??ikken oyuncu d??d??rmeye etki edemez. Default d??nd??rme algoritmas?? ??al??????r.
            this.rot-=(this.rot-angle)*0.5;                    //d??nd??rme parametresini a????sal y??nelim kadar ??evirir.ters d??nmeyi 2 ye b??lerek engeller 
            this.rSpeed= this.rSpeed -(angle-this.rot);        //y??nelim a????s?? ile araban??n d??nd??rme par. aras??ndaki fark kadar d??nd??rme h??z?? ayarlan??r.
        }
                                                               //Kullan??c?? d??n????e m??dahale edi??i;
        this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;    //sa?? sol komutlar d??nd??rme h??z??n?? ayarlar. 
        this.rot-=this.rSpeed * 0.05;                          //ayarlanan d??nd??rme h??z?? d??nd??rme parametresini ayarlar.
        
        this.rot -= this.rSpeed * 0.1;
        if(this.rot > Math.PI) this.rot = -Math.PI;
        if(this.rot < -Math.PI) this.rot = Math.PI;            //Dikine d????meleri engelleyecek ??ekile getirildi.
                                                               // Ara?? ??izimi i??in parametreler haz??r.
        //Truck draw
        this.y += this.ySpeed;
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rot);
        ctx.drawImage(this.truck,-40,-40,80,80);
        ctx.restore();
    }    
}

//Rastgele zemin ??retecek.Arka ve ??n planlar?? dolduracak. Arac?? ??izimini gerle??tirecek.Zaman parametresini art??racak.
//Frame halinde s??rekli yenilenerek oyunu anime edecek fonksiyon.
function draw(){                                               

    speed -= (speed - (k.ArrowUp) ) * 0.01;
    t+= 10*speed;                                              //Zaman de??i??keni her fonksiyon giri??inde art??r??l??r.her draw bir ad??md??r.
                                                               //Bu zaman de??i??kenimiz asl??nda draw fonksiyonu ger??ekle??me sayac??d??r.
    //background
    ctx.fillStyle=bgcolor;                                     // doldurulacak rengi atad??k
    ctx.fillRect(0,0,c.width,c.height);                        //0,0 koordinat??ndan width height koor. kadar renge doldurdu
    
    //truck
    player.draw();
    
    //ground
    ctx.fillStyle=forecolor;
    ctx.strokeStyle=linecolor;
    ctx.lineWidth= linewidth;
    ctx.beginPath();
    ctx.moveTo(offset,c.height-offset);                         //nereden ??izilecek
                                                                
    for(let i=offset; i<c.width-offset;++i){                    //nereye ??izilece??i
        ctx.lineTo(i,(c.height*0.9)-noise(i+t)* yRatio) ;
    
    }                                                          //dikd??rtgenin ??stkenar?? random ??ekilde olacak
    ctx.lineTo(c.width-offset,c.height-offset)
                                                               // ctx.lineTo(offset,c.height-offset);//dikd??rtgen ??izildi 
    ctx.closePath();
    ctx.fill();
    ctx.stroke();                                              //??izgi kal??nla??t??r??ld??
    
    player.drawInterface();                                    //oyun interface'i eklendi
   
    requestAnimationFrame(draw);
}

draw();

if(mobilmi){
 c.addEventListener("touchstart", handleStart, false);         // c.addEventListener("touchstart",handleStart,{ get passive() { supportsPassive = true; } });
 c.addEventListener("touchend",handleEnd,false);               // c.addEventListener("touchend",handleEnd,{ get passive() { supportsPassive = true; } });


  function handleStart(evt){                                   //Dokunulan yerin koordinatlar??n?? al??r Press checke yollar.
    evt.preventDefault();
    var touches = evt.changedTouches;
    for(let i = 0; i < touches.length; i++){
        var touch=touches[i];
        checkBtnPress(touch.pageX,touch.pageY);        
    }
  }

  function handleEnd(evt){                                     //Etkile??imin kalkt?????? yerin koor. al??r Release check'e yollar.
    evt.preventDefault();
    var touches=evt.changedTouches;
    for(let i=0;i<touches.lenght;i++){
        var touch=touches[i];
        checkBtnRelase(touch.pageX,touch.pageY);
    }
  }
}else{
    //desktop control
    onkeydown = d => k[d.key] = 1;
    onkeyup = d => k[d.key] = 0;
    
    c.addEventListener("click",handleClick,false);             //c.addEventListener("click",handleClick,{ get passive() { supportsPassive = true; } });
    function handleClick(evt){
        checkBtnPress(evt.clientX,evt.clientY);                //T??klama kontrol?? yapar. ***Start tu??u i??in
    }
}


function checkBtnPress(x,y){
    if(!playing && (x > ((c.width / 2)-25) && x < ((c.width/2) + 25)
                && y > ((c.height / 3) + 50) && y < ((c.height / 3) + 100))||k.Space){       
                    window.location.reload();                  //E??er oyun bitmi??se ve start buton i??inde bir yer click'se sayfa yenilenir.Oyun yeniden ba??lar.
    }
    if(playing && x > 20 && x < 90 && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowLeft = 1;                                        //sol tu??a bas??ld??????nda sol buton de??i??keni bir olur.
    }
    if(playing && x > 110 && x < 180 && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowRight = 1;
    }
    if(playing && x > (c.width - 90) && x < (c.width - 20) && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowUp = 1;
    }
}

function checkBtnRelase(x,y){
    if(!playing &&( x > ((c.width / 2)-25) && x < ((c.width/2) + 25) 
                && y > ((c.height / 3) + 50) && y < ((c.height / 3) + 100))||k.Space){
        window.location.reload();
    }
    if(playing && x > 20 && x < 90 && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowLeft = 0;
    }
    if(playing && x > 110 && x < 180 && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowRight = 0;
    }
    if(playing && x > (c.width - 90) && x < (c.width - 20) && y > (c.height -90) && y < (c.height - 20)){
        k.ArrowUp = 0;
    }
}

