<?php
// Include database connection
include 'db.php';

$message = '';
$popupType = ''; // Variable to indicate success or error for JavaScript

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Hash the password before storing it
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashed_password);

        if ($stmt->execute()) {
            $message = 'Signup successful! You can now log in.';
            $popupType = 'success'; // Set popup type to success
        } else {
            $message = 'Signup failed. Please try again.';
            $popupType = 'error'; // Set popup type to error
        }
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Handle duplicate email error
            $message = 'Email already exists. Please use a different one.';
            $popupType = 'error'; // Set popup type to error
        } else {
            $message = "Error: " . $e->getMessage();
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
    <title>VibeIT Music - Signup</title>
    <link rel="icon" type="png" href="assets/images/image18-removebg-preview.png">
    <link href="assets/css/login.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- SweetAlert2 -->
</head>
<body>
    <div class="main">
        <label class="brand">
            <img src="assets/images/pd10-removebg-preview.png"/>
            VibeIT
        </label>

        <div class="signup">
            <form method="POST" action="">
                <label for="chk" aria-hidden="true">Sign up</label>
                <input type="text" name="username" placeholder="User name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit" class="button">Sign up</button>
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
