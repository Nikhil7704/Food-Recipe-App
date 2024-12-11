document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
      const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
          // Store JWT token in localStorage
          localStorage.setItem("token", result.token);

          // Redirect to food recipe page
          window.location.href = "food-recipes.html";  // Assuming this page is where recipes are displayed
      } else {
          alert(result.message || 'Login failed. Please try again.');
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
  }
});
