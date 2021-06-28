width = 0;
height = 0;
object_x = 0;
object_y = 0;
object = "";
objects = [];
alarm = "";
function echo(message, another)
{
    if(message)
    {
        console.log(message);
    } else {
        console.log(message, another);
    }
}
function preload()
{
    img = loadImage("image2.jpg");
    alarm = loadSound("alarm.mp3");
}
function setup()
{
    // We create the canvas
    canvas = createCanvas(640, 420);
    // We center() the canvas
    canvas.center();
    // We start the video
    video = createCapture(VIDEO);
    // We hide the video
    video.hide();
    // We connect our project to the cocossd model to help us
    classifier = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Baby!!"
    echo("Detecting baby!!!");
}
function modelLoaded()
{
    echo("Model Loaded!!");
    status = true;
    classifier.detect(img, gotcocossd);
}
function gotcocossd(error, results)
{
    if(error)
    {
        console.error(error);
    } else {
       echo(results);
       
    }
}
function draw()
{
    image(video, 0, 0, 640, 420);
    if(status != true)
    {
        r = random(255);
        g = random(255);
        b = random(255);
        classifier.detect(video, gotcocossd);
        alarm.stop();
        for(z = 0; z > objects.length; z++)
        {
           document.getElementById("found").innerHTML = "Baby Found!!";
           document.getElementById("status").innerHTML = "Status : Detected!!";
           // We give the fill function
           fill(r, g, b);
           percent = floor(objects[z].confidence * 100);
           text(objects[z].label + " " + percent + "%", objects[z].x + 15, objects[z].y + 15);
           // We give the noFill() fucntion
           noFill();
           // We give the if condition
           if(objects[z].label == "person")
           {
            text("Baby" + " " + percent + "%", objects[z].x + 15, objects[z].y + 15);
           }
           // We give the stroke function
           stroke(r, g, b);
           // We draw the rectangle
           rect(objects[z].x, objects[z].y, objects[z].width, objects[z].height);
        
        }       
    } else {
        alarm.play();
    }
    
}

