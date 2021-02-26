export default async function _imageLoader(sprites) {
    console.log('@loadImages');
     for (const sprite in sprites) {
 
         sprites[sprite].img.src = sprites[sprite].url;
         await sprites[sprite].img.decode();      
         
     }
  // console.log(window.location.pathname.split('/'));
     return 'images uploaded';
 
 }