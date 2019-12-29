const modelParams = {
    flipHorizontal: false,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 2,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.89,    // confidence threshold for predictions.
  }
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  //select everything from html
  const video = document.querySelector('#video');
  const audio = document.querySelector('#audio');
  let model;
  

  handTrack.startVideo(video)
  .then(status => {
      if(status)
      {
          navigator.getUserMedia({video: {}}, stream =>{
              video.srcObject = stream;
              //run our detection
              setInterval(runDetection,500);
          },
          err => console.log(err)
          );
      }
  });


function runDetection(){
  model.detect(video)
       .then(predictions => {
           if(predictions.length!==0)
           {
               let hand1 = predictions[0].bbox;
               let x = hand1[0];
               let y = hand1[1];
              
               if(y >= 150)
               {
                   if(x<200)
                   audio.src = 'c.wav';
                   else if(x>500)
                   audio.src = 'e.wav';
                   else if(x>300&&x<=500)
                   audio.src = 'b.wav';
                   else if(x>=200&&x<=300)
                   audio.src = 'a.wav';
               }
               //play the sound
               audio.play();
           }
       });
}




  handTrack.load(modelParams)
  .then(lmodel => {
   model =lmodel;
});