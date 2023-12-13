<?php
chdir("..");
$provided_secret = $_SERVER['HTTP_X_HUB_SIGNATURE_256'];
$config = parse_ini_file(".env");
$hash = "sha256=" . hash_hmac("sha256", file_get_contents('php://input'), $config["secret"]);
if (!hash_equals($hash, $provided_secret)) {
  http_response_code(400);
  die("you are not github");
} else {
  echo("success it worked");
  system(escapeshellcmd("su -c " . $config["user"] . " ./update.sh"));
}
?>
