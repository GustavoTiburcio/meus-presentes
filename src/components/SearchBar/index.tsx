import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import { Button, Container, Input } from './styles';
import { toast } from 'react-toastify';

interface SearchBarProps {
  placeholder: string;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function SearchBar({ placeholder, setModalVisible }: SearchBarProps) {
  const [pesquisa, setPesquisa] = useState<string>('');

  return (
    <Container onSubmit={(e: any) => {
      e.preventDefault();
      if (!pesquisa) {
        toast.warning('Pesquisa inválida, preencha o campo de pesquisa.');
        return;
      }

      setModalVisible(false);
    }}>
      <Input
        placeholder={placeholder}
        onChange={(e) => setPesquisa(e.target.value.trimEnd())}
        autoFocus={true}
      />
      <Button type='submit'>
        <FiIcons.FiSearch
          size={25}
          color='#000'
        />
      </Button>
    </Container>
  );
}

