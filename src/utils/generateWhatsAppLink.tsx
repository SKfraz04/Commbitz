export  const generateWhatsAppLink = () => {
  const phoneNumber = '+447452292014'; // Replace this with the phone number you want to message
  const message = 'Hello!'; // Replace this with the message you want to send

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};