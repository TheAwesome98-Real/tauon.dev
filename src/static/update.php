<?php
chdir("..");
$provided_secret = $_SERVER['HTTP_X_GITHUB_EVENT'];
$real_secret = explode("=", fread(fopen(".env", "r"),filesize($url)));
if $provided_secret != $real_secret[1] {
  die("you are not github");
}
system(escapeshellcommand("yarn update"));
?>
