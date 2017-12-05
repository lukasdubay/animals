if(document.documentElement.clientWidth > 1023){
  var width = 1024;
  var height = 768;
}else{
  var width = 1334;
  var height = 750;
}
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
       //resizeToFill: true,
   }
};
