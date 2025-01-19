<?php
include 'db.php';

$message = '';
$popupType = ''; // Variable to store the type of pop-up ('success' or 'error')

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'signup') {
        // Handle signup logic
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Secure password hashing

        try {
            $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$username, $email, $password]);
            $message = "Signup successful! You can now log in.";
            $popupType = 'success'; // Set popup type to success
        } catch (PDOException $e) {
            $message = "Error during signup: " . $e->getMessage();
            $popupType = 'error'; // Set popup type to error
        }
    } elseif (isset($_POST['action']) && $_POST['action'] === 'login') {
        // Handle login logic
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Successful login
            session_start();
            $_SESSION['user_id'] = $user['id']; // Store user ID in session
            $_SESSION['username'] = $user['username']; // Store username in session
            header("Location: index.html"); // Redirect to index.html after login
            exit(); // Make sure no further code runs after the redirect
        } else {
            $message = "Invalid email or password.";
            $popupType = 'error'; // Set popup type to error
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VibeIT Music</title>
    <link rel="icon" type="image/png" href="assets/images/image18-removebg-preview.png">
    <link href="assets/css/login.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- SweetAlert2 -->
</head>
<body>
    <div class="main">
        <label class="brand">
            <img src="assets/images/pd10-removebg-preview.png"/>
            VibeIT
        </label>
        <input type="checkbox" id="chk" aria-hidden="true" />

        <!-- Signup Form -->
        <div class="signup">
            <form id="signupForm" action="login.php" method="POST">
                <input type="hidden" name="action" value="signup">
                <label for="chk" aria-hidden="true">Sign up</label>
                <input type="text" name="username" placeholder="User name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit" class="button">Sign up</button>
            </form>
        </div>

        <!-- Login Form -->
        <div class="login">
            <form id="loginForm" action="login.php" method="POST">
                <input type="hidden" name="action" value="login">
                <label for="chk" aria-hidden="true">Log in</label>
                <input type="email" id="loginEmail" name="email" placeholder="Email" required />
                <input type="password" id="loginPassword" name="password" placeholder="Password" required />
                <button type="submit" class="button">Log in</button>
            </form>
        </div>
    </div>

    <!-- JavaScript for Pop-Up Notifications -->
    <?php if (!empty($message)): ?>
    <script>
        Swal.fire({
            icon: '<?= $popupType ?>', // 'success' or 'error'
            title: '<?= $popupType === "success" ? "Success" : "Error" ?>',
            text: '<?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?>',
        });
    </script>
    <?php endif; ?>
</body>
</html>
