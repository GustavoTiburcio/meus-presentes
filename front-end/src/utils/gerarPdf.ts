import html2pdf from 'html2pdf.js';

export function gerarPDF(name: string) {
  const element = document.getElementById('pedido-pdf');
  const opt = {
    filename: `${name}.pdf`,
    margin: 10,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(element).save();
}
