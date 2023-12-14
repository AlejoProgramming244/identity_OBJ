status = "";
obj = [];

document.getElementById('arrowContainer').addEventListener('mouseenter', function() {
    document.getElementById('navigation').style.left = '0';
});

document.getElementById('navigation').addEventListener('mouseleave', function() {
    document.getElementById('navigation').style.left = '-200px';
});

function setup()
{
    Canvas = createCanvas(640, 420);
    Canvas.center();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);

    setTimeout(function()
    {
        document.getElementById("status").innerHTML = "Página cargada!";

        

        setTimeout(function()
        {
            document.getElementById("status").innerHTML = "Reconociendo Objetos...";

            setTimeout(function()
            {
                if(obj.length == 0)
                {
                    document.getElementById("status").innerHTML = "No se reconocieron objetos :(";
                }
                else
                {
                    document.getElementById("status").innerHTML = li;

                    setTimeout(function()
                    {
                        document.getElementById("status").innerHTML = ls;
                    }, 5000)
                }

            }, 2000);

        }, 3000);

    }, 5000);
}

function modelLoaded()
{
    console.log("Modelo CocoSsd Cargado");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error("error");
    }
    else
    {
        console.log(results);

        obj = results;
    }
}

function preload()
{
    img = loadImage("Ha.jpg");
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for(i=0; i < obj.length; i++)
        {
            li = "Se detectaron objetos, en una momento llega info, espera unos segundos..."

            ls = "Hay más de 10 objetos en la imagen de la cual el modelo cocosd detectó: " + obj.length;

            fill("black");

            objPe = floor(obj[i].confidence * 100);

            text(obj[i].label + " " + objPe + "%", obj[i].x, obj[i].y);

            stroke("black");

            noFill();

            rect(obj[i].x + 10, obj[i].y + 10, obj[i].width, obj[i].height);
        }
    }

    setTimeout(function()
    {
        if(status == true)
        {
            document.getElementById("status").innerHTML = "No se reconoció ningún objeto :("; 
        }

    }, 12000);
}

