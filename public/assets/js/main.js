document.addEventListener("DOMContentLoaded",function(){new SweetScroll({}),particlesJS("particles-js",{particles:{number:{value:30,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"polygon",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.5,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:3,random:!0,anim:{enable:!1,speed:19.18081918081918,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:4,direction:"none",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}},nb:80},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0})},!1);
document.addEventListener("DOMContentLoaded",function(){
    new SweetScroll({});
    particlesJS("particles-js",{
        particles:{
            number:{value:30,density:{enable:!0,value_area:800}},
            color:{value:"#ffffff"},
            shape:{type:"polygon",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},
            opacity:{value:.5,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},
            size:{value:3,random:!0,anim:{enable:!1,speed:19.18081918081918,size_min:.1,sync:!1}},
            line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:.4,width:1},
            move:{enable:!0,speed:4,direction:"none",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}},
            nb:80
        },
        interactivity:{
            detect_on:"canvas",
            events:{
                onhover:{enable:!1,mode:"grab"},
                onclick:{enable:!0,mode:"push"},
                resize:!0
            },
            modes:{
                grab:{distance:400,line_linked:{opacity:1}},
                bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},
                repulse:{distance:200,duration:.4},
                push:{particles_nb:4},
                remove:{particles_nb:2}
            }
        },
        retina_detect:!0
    })
},!1);

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const spinner = document.getElementById('spinner');
    const successIcon = document.getElementById('success-icon');
    
    spinner.style.display = 'block';
    successIcon.style.display = 'none';
    
    fetch('http://localhost:5000/api/contact/send-contact-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        spinner.style.display = 'none';
        if (data.message === 'Email sent successfully') {
            successIcon.style.display = 'block';
            setTimeout(() => {
                successIcon.style.display = 'none';
                document.getElementById('contactForm').reset();
            }, 2000);
        } else {
            alert('Failed to send email. Please try again later.');
        }
    })
    .catch(error => {
        spinner.style.display = 'none';
        alert('An error occurred. Please try again later.');
        console.error('Error:', error);
    });
});
