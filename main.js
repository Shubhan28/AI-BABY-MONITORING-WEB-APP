width = 0;
height = 0;
object_x = 0;
object_y = 0;
object = "";
objects = [];
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
}
function setup()
{
    // We create the canvas
    canvas = createCanvas(640, 420);
    // We center() the canvas
    canvas.center();
    // We connect our project to the cocossd model to help us
    classifier = ml5.objectDetector('cocossd', modelLoaded);
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
       width = results[0].width;
       height = results[0].height;
       object_x = results[0].x;
       object_y = results[0].y;
       object = results[0].label;
       objects = results;
       
    }
}
function draw()
{
    image(img, 0, 0, 640, 420);
    for(i = 0; i > objects.length; i++)
    {
        fill(255, 0, 255);
        noFill();
        stroke(0, 255, 255);
        rect(objects[i].x, object[i].y, objects[i].width, objects[i].height);
    }       
}


