const root = window.location.origin;
let path = "/";
if (window.location.hostname.includes("github.io")) {
  path = "/Frontend-Projektarbete-VG-niva/";
}
document.getElementById("base-path").setAttribute("href", root + path);
