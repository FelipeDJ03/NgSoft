// This is your test secret API key.
const stripe = Stripe("pk_test_51Q0CsUKM9by4ZMgcGXbZTc0z3f1TQ77g4GJKNoNQoprzWBUd174Zgqx4AJqzpgSB0bYGYv5oEcOzZeTsrFgvuLEr00Mah1WiX2");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}