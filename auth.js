// ===== Initialize Supabase =====
const supabaseUrl = 'https://xxkjkrauwifjqvjazmis.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4a2prcmF1d2lmanF2amF6bWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2Mzc4NzcsImV4cCI6MjA3NTIxMzg3N30.4JL279pqkcopdpgGOuMchgyA_uxUCCniANN69_RDH1I';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// DOM elements
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const authMessage = document.getElementById('authMessage');

// Sign in
signInBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();

  if (!email || !password) {
    authMessage.textContent = "Please enter email and password.";
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    authMessage.textContent = "Login failed: " + error.message;
    return;
  }

  window.location.href = "dashboard.html";
});

// Sign up
signUpBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();

  if (!email || !password) {
    authMessage.textContent = "Please enter email and password.";
    return;
  }

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    authMessage.textContent = "Signup failed: " + error.message;
    return;
  }

  authMessage.textContent = "Signup successful! Please verify your email.";
});
