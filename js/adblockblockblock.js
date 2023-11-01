if (navigator.getEnvironmentIntegrity !== undefined) {
  document.documentElement.innerHTML = `<head><title>Redirecting...</title></head><body><h1>Redirecting...</h1><p>You are about to be redirected to: <a href="/1984.html">/1984.html</a> (click the link if this does not happen)`;
  window.location.pathname = "/1984.html";
}
