export function formatarDataHora(dataHoraCompleta: any) {
  const partes = dataHoraCompleta.split(' ');
  const data = partes[0];
  const hora = partes[1].split('.')[0].split(':').slice(0, -1);
  const dataFormatada = data.split('-').reverse().join('/');
  const horaFormatada = hora.join(':');
  return dataFormatada + ' ' + horaFormatada;
}
