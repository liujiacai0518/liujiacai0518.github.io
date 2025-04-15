function isBlobUrlSupported() {
  try {
    const blob = new Blob(['test'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    URL.revokeObjectURL(url);
    return true;
  } catch (e) {
    return false;
  }
}

if (!isBlobUrlSupported()) {
  console.error('TV browser does not support blob URLs');
  // 使用备用方案
}