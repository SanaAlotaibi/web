// In HomeScript.js
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = 'Light Theme';
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? 'Light Theme' : 'Dark Theme';
  });
});
