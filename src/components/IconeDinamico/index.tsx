import * as aiIcons from 'react-icons/ai'; //Ant Desing Icons
import * as faIcons from 'react-icons/fa'; //Font Awesome 5
import * as fiIcons from 'react-icons/fi'; //Feather
import * as ioIcons from 'react-icons/io'; //Ionicons 4
import * as io5Icons from 'react-icons/io5'; //Ionicons 5

interface IconProps {
  nome?: string;
  size?: number;
}

export default function IconeDinamico({ nome, size }: IconProps) {
  if(!nome) return <></>;

  const getIcon = (iconName: string) => {
    const iconsMap = new Map();
    iconsMap.set('Ai', aiIcons);
    iconsMap.set('Fa', faIcons);
    iconsMap.set('Fi', fiIcons);
    iconsMap.set('Io', ioIcons);
    iconsMap.set('Io5', io5Icons);

    return iconsMap.get(iconName.substring(0, 2));
  };

  const icons: any = getIcon(nome);
  const TheIcon: any = icons[nome];

  return <TheIcon size={size}/>;
}

// import React from 'react';
// import * as Icons from 'react-icons/all';

// interface IconProps {
//   nome: string | undefined;
//   size?: number;
// }

// export default function IconeDinamico({ nome, size }: IconProps) {
//   if (!nome) return <></>;

//   const Icone = Icons[nome]; // obtém o ícone correspondente

//   return <Icone size={size ?? 30}/>;
// }
