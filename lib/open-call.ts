export function openCall() {
  const open = () => document.getElementById("wch-launcher")?.click();
  if (document.getElementById("wch-launcher")) {
    open();
    return;
  }
  const started = Date.now();
  const timer = window.setInterval(() => {
    if (document.getElementById("wch-launcher") || Date.now() - started > 5000) {
      window.clearInterval(timer);
      open();
    }
  }, 100);
}
