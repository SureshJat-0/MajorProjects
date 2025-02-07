const taxSwitch = document.querySelector('.taxSwitch');
const taxParas = document.querySelectorAll('.custom_tax_js');

taxSwitch.addEventListener('click', (e) => {
    taxParas.forEach((para) => {
        if (e.target.checked) {
            para.style.display = 'block';
        } else {
            para.style.display = 'none';
        }
    })
})