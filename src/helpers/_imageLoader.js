 const _imageLoader = async (url) => {
    console.log('@loadImages');
    const image = new Image();
     image.src = url;
      await image.decode();      
        
     return 'ok';
 
 }


 export default _imageLoader;

 // console.log(window.location.pathname.split('/'));