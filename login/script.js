// Function to handle login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    // Add validation checks and error handling for the inputs
  
    // Check if the user exists in local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(u => u.email === email && u.password === password);
    if (!currentUser) {
      console.error('Invalid email or password');
      // Show an error message to the user or handle it as per your UI
      return;
    }
  
    // Generate a random token and store it in local storage
   // const token = generateToken(); // Implement this function to generate a random token
    //localStorage.setItem('token', token);//
  
    // Save the current user data in local storage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
    // Redirect the user to the shop page after successful login
    window.location.href = '../shop/index.html';
  }
  
  document.getElementById('loginButton').addEventListener('click', handleLogin);
  