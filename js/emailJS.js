let submit_form = document.querySelector('form');
var input_field = document.getElementsByTagName('input');
let contactSection = document.getElementById('contact-section');
const message_Sent_Status = document.querySelector('.message-sent-status');
const cross_mark = document.querySelector('#contact-section .message-sent-status i');
const message_title = document.getElementById('h5');
const message_description = document.getElementById('message-status-content');
let message_button = document.getElementById('message-button');



cross_mark.style.opacity = 0;
message_Sent_Status.addEventListener('mouseover', function() {
  cross_mark.style.opacity = 1;
});
message_Sent_Status.addEventListener('mouseout', function() {
  cross_mark.style.opacity = 0;
});

///////////// EmailJS configuration   ////////////////

const serviceId = 'service_5teucql';
const templateId = 'template_hrk5iyh';
const publicKey = 'V_YeifqH6E3TXlaa6';

(function(){
  emailjs.init({
    publicKey: publicKey,
  });
})();

const templateParams = {
    from_name: input_field.name,
    from_email: input_field.email,
    message: input_field.message,
    to_name: `Hi ${input_field.name}`, // Changed from 'Portfolio Owner' to personalized greeting
    reply_to: input_field.email,
    to_email: input_field.email // Adding recipient email explicitly
  };
  
  console.log('Sending email with params:', templateParams);



  //Sending the response to user whether the message sent or not
submit_form.addEventListener("submit", function (e) {
  e.preventDefault();

  for(var i = 0; i < input_field.length; i++) {
    console.log(input_field[i].value);
  }


  emailjs.sendForm(serviceId, templateId, this)
    .then(function () {
      message_Sent_Status.classList.add('active');
      message_title.textContent = "Message Sent!";
      message_description.innerHTML = `Thank you ${input_field[0].value}, your message has been sent successfully!`;    
      message_button.textContent = 'Sending...';
      
      setInterval(() => {
        message_button.textContent = 'Sent!';
      }, 1000);
    }, 
    function (error) {
        console.log('FAILED...', error);
      message_Sent_Status.classList.add('active');
      message_title.textContent = "Failed to send message!";
      message_description.innerHTML = `Sorry ${input_field[0].value}, there was an error sending your message. Please try again later.`;
      setInterval(() => {
        message_button.textContent = 'Not sent!';
      }, 1000);
    });
});

cross_mark.addEventListener('click', () => {
  message_Sent_Status.classList.remove('active');
});