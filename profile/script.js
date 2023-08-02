document.addEventListener('DOMContentLoaded', function () {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const saveProfileButton = document.getElementById('saveProfile');
    const userName = document.getElementById('userName');
  
    const oldPasswordInput = document.getElementById('oldPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const changePasswordButton = document.getElementById('changePassword');
    const logoutButton = document.getElementById('logout');
  
    // Function to check if the user is logged in
    function checkLoggedIn() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        // Redirect the user to the login page if not logged in
        window.location.href = '../signup/index.html';
      } else {
        // Show the user's name on the page
        userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        firstNameInput.value = currentUser.firstName;
        lastNameInput.value = currentUser.lastName;
      }
    }
  
    // Function to save updated profile data
    function saveProfile() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
  
      // Add validation checks and error handling for the inputs
  
      // Update user data in localStorage
      currentUser.firstName = firstName;
      currentUser.lastName = lastName;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
      // Update user's name on the page
      userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    }
  
    // Function to change password
    function changePassword() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const oldPassword = oldPasswordInput.value;
      const newPassword = newPasswordInput.value;
      const confirmPassword = confirmPasswordInput.value;
  
      // Add validation checks and error handling for the inputs
  
      // Check if old password matches the current user's password
      if (oldPassword !== currentUser.password) {
        console.error('Old password is incorrect');
        // Show an error message to the user or handle it as per your UI
        return;
      }
  
      // Check if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        console.error('New password and confirm password do not match');
        // Show an error message to the user or handle it as per your UI
        return;
      }
  
      // Update the user's password in localStorage
      currentUser.password = newPassword;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
      // Clear password fields
      oldPasswordInput.value = '';
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
  
      console.log('Password changed successfully');
      // Show a success message to the user or handle it as per your UI
    }
  
    // Function to handle logout
    function handleLogout() {
      // Clear the current user from localStorage
      localStorage.removeItem('currentUser');
      // Redirect the user to the login page after logout
      window.location.href = '../login/index.html';
    }
  
    // Check if the user is logged in when the page loads
    checkLoggedIn();
  
    saveProfileButton.addEventListener('click', saveProfile);
    changePasswordButton.addEventListener('click', changePassword);
    logoutButton.addEventListener('click', handleLogout);
  });
  