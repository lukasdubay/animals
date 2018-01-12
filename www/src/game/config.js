var old = false;
if(document.documentElement.clientWidth > 1100){
  var width = 1024;
  var height = 768;
}else if(document.documentElement.clientWidth > 1023){
  //get if retina or not!!
  var width = 1024;
  var height = 768;
  old = true;
}else if( document.documentElement.clientWidth > 400 && document.documentElement.clientWidth < 660){
  var width = 1334;
  old = true;
  var height = 750;
}else{
  var width = 1334;
  var height = 750;
}
//old = true;
pandaConfig = {
  name: 'Animal Farm',
  version: '1.0.0',
  system: {
       startScene: 'Main',
       hires: 2,
       width: width,
       height: height,
       center: true,
       //scaleToFit: true,
       resizeToFill: true,
   }
};
