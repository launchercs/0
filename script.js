const fileInput = document.getElementById('fileInput');
const selectBtn = document.getElementById('selectBtn');
const downloadBtn = document.getElementById('downloadBtn');
const filePreview = document.getElementById('filePreview');
const fileNameEl = document.getElementById('fileName');
const fileSizeEl = document.getElementById('fileSize');
const fileTypeEl = document.getElementById('fileType');
const successMessage = document.getElementById('successMessage');

let selectedFile = null;

// کلیک روی دکمه انتخاب فایل
selectBtn.addEventListener('click', () => {
    fileInput.click();
});

// وقتی کاربر فایلی انتخاب کرد
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    selectedFile = file;
    
    // نمایش اطلاعات فایل
    fileNameEl.textContent = file.name;
    fileSizeEl.textContent = formatFileSize(file.size);
    fileTypeEl.textContent = file.type || 'نامشخص';
    
    // نمایش بخش پیش‌نمایش
    filePreview.classList.add('show');
    
    // فعال کردن دکمه دانلود
    downloadBtn.disabled = false;
    
    // مخفی کردن پیام موفقیت قبلی
    successMessage.classList.remove('show');
});

// کلیک روی دکمه دانلود
downloadBtn.addEventListener('click', () => {
    if (!selectedFile) return;
    
    downloadFile(selectedFile);
    
    // نمایش پیام موفقیت
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
});

// تابع دانلود فایل (بدون نیاز به لینک)
function downloadFile(file) {
    // ساخت آدرس موقت برای فایل
    const fileURL = URL.createObjectURL(file);
    
    // ساخت لینک دانلود موقت
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = file.name;   // نام اصلی فایل حفظ می‌شود
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // آزاد کردن حافظه
    setTimeout(() => URL.revokeObjectURL(fileURL), 1000);
}

// تبدیل بایت به فرمت خوانا
function formatFileSize(bytes) {
    if (bytes === 0) return '0 بایت';
    const units = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + units[i];
  }
