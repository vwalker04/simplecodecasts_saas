$(document).ready(function() {
   var stripe = Stripe($('meta[name="stripe-key"]').attr('content'));
   console.log(stripe);
   var elements = stripe.elements();
   console.log(elements);
   var card = elements.create('card');
   card.mount('#card-element');
   console.log(card);
   // Watch for a form submission
   document.querySelector('form').addEventListener('submit', function(event) {
       event.preventDefault();
       console.log("prevented default!");
       stripe.createToken(card).then(function(result) {
         if (result.error) {
            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
         } else {
            // Send the token to your server
            stripeTokenHandler(result.token);
         }
      });
   }); // form-submission
   
   function stripeTokenHandler(token) {
      // Insert the token ID into the form so it gets submitted to the server
      var form = document.getElementById('new_user');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripe_customer_token');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);
    
      // Submit the form
      form.submit();
    }
});