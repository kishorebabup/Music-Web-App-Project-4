audio_Peter = "";
audio_Harry = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

leftWrist_score = 0;

song1_status = "";
song2_status = "";

function setup(){
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();  

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function preload(){
 audio_Peter = loadSound("music2.mp3");
 audio_Harry = loadSound("music.mp3");
}

function draw(){
  image(video, 0, 0, 600, 500);

  song1_status = audio_Peter.isPlaying();
  song2_status = audio_Harry.isPlaying();

  fill("red");
  stroke("black"); 

      if(leftWrist_score > 0.2){
        circle(leftWristX, leftWristY, 20);
        audio_Harry.pause();
      
        if(song1_status == "false"){
          audio_Peter.play();
          document.getElementById("song_name").innerHTML = "Peter Pan."
        }
      }
}

function modelLoaded(){
  console.log("PoseNet is Initialised");
}

function gotPoses(results){
  if (results.length > 0){
    console.log(results);

  leftWristX = results[0].pose.leftWrist.x;
  leftWristY = results[0].pose.leftWrist.y;

  rightWristX = results[0].pose.rightWrist.x;
  rightWristY = results[0].pose.rightWrist.y;
  }

  leftWrist_score = results[0].pose.keypoints[9].score;
}