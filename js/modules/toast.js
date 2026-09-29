export function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;

  document.body.appendChild(toast);
  toast.addEventListener('animationend', () => toast.remove());
}
