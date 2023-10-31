import React, { useState } from 'react'
import { ActionButton, ButtonsContainer, CustomInputContainer, FormContainer, Gift } from './styles'
import { TGift } from '../../pages/GiftList';
import IconeDinamico from '../IconeDinamico';
import { toast } from 'react-toastify';

interface IGiftCardProps {
  gift: TGift;
  setSelectedGiftsMock: (selectedGiftsMock: any) => void;
  setModalVisible: (modalVisible: boolean) => void;
  setSelectedModalItem: (selectedModalItem: TGift) => void;
}

export default function GiftCard({
  gift,
  setSelectedGiftsMock,
  setModalVisible,
  setSelectedModalItem
}: IGiftCardProps) {
  const [inputsValues, setInputsValues] = useState<TGift | undefined>();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputsValues?.requestedAmount) {
      toast.warning('Verifique a quantidade informada');
      return;
    }

    const newItem = [{ ...inputsValues, ...gift }];


    setSelectedGiftsMock((prev: any) => {
      const alreadyExist = prev.filter((prev: any) => prev.id === gift.id);

      if (alreadyExist.length > 0) {
        return prev.map((prev: any) => {
          if (prev.id === gift.id) {
            return { ...prev, ...{ ...inputsValues, requestedAmount: +inputsValues.requestedAmount! + +prev.requestedAmount } }
          }
          return prev;
        });
      }

      return [...prev.filter((selectedGift: any) => JSON.stringify(selectedGift) !== JSON.stringify({ id: 9999999, name: '', imageUri: '', requestedAmount: 0, confirmedAmount: 0 })), ...newItem];
    });

    toast.success(`${gift.name} foi adicionado a lista 😁`);
    setInputsValues(undefined);
  }

  return (
    <Gift hidden={!gift.name && !gift.imageUri}>
      <b>{gift.name}</b>
      <img src={gift.imageUri} alt={gift.name} title={gift.imageUri === 'https://louisville.edu/research/handaresearchlab/pi-and-students/photos/nocamera.png/image' ? 'Sem imagem' : gift.name} />
      <hr />
      {gift?.requestedAmount ? (
        <>
          <p>Solicitado: {gift.requestedAmount ?? 0} {gift.requestedAmount && gift.requestedAmount > 1 ? 'unidades' : 'Unidade'}</p>
          <p>Confirmado: {gift.confirmedAmount ?? 0} {gift.confirmedAmount && gift.confirmedAmount > 1 ? 'unidades' : 'Unidade'}</p>
          <br />
        </>
      ) : (<></>)}
      <ButtonsContainer>
        {gift?.requestedAmount && gift?.requestedAmount > 0 ?
          <>
            <ActionButton
              onClick={() => {
                setModalVisible(true);
                setSelectedModalItem(gift);
              }}
            >
              <IconeDinamico nome='AiOutlineEdit' />
              Editar
            </ActionButton>
            <ActionButton
              onClick={() => {
                setSelectedGiftsMock((prev: any) => prev.filter((selectedGift: any) =>
                  JSON.stringify(selectedGift) !== JSON.stringify({ id: 9999999, name: '', imageUri: '', requestedAmount: 0, confirmedAmount: 0 }) &&
                  (selectedGift.id !== gift.id)
                ));
              }}
            >
              <IconeDinamico nome='AiOutlineDelete' />
              Excluir
            </ActionButton>
          </>
          :
          <FormContainer onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleFormSubmit(e)}>
            <CustomInputContainer>
              <label>Quantidade</label>
              <input
                type='number'
                placeholder='Quantidade desejada'
                value={inputsValues?.requestedAmount ?? ''}
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputsValues((prev: any) => ({ ...prev, requestedAmount: e.target.value }));
                  }
                }
                onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                  if (e.target.value && +e.target.value < 1) {
                    setInputsValues((prev: any) => ({ ...prev, requestedAmount: '' }));
                    toast.warning('Quantidade informada inválida');
                  }
                }}
              />
            </CustomInputContainer>
            <CustomInputContainer>
              <label>Cor</label>
              <input
                type='text'
                placeholder='Preferência de cor'
                value={inputsValues?.color ?? ''}
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputsValues((prev: any) => ({ ...prev, color: e.target.value }));
                  }
                }
              />
            </CustomInputContainer>
            {gift.electrical && (
              <CustomInputContainer>
                <label>Voltagem</label>
                <select
                  value={inputsValues?.voltage ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setInputsValues((prev: any) => ({ ...prev, electrical: true, voltage: e.target.value }));
                  }}
                >
                  <option value={''} disabled hidden> - Escolha - </option>
                  <option value={'220v'}>220v</option>
                  <option value={'110v'}>110v</option>
                  <option value={'24v'}>24v</option>
                  <option value={'12v'}>12v</option>
                </select>
              </CustomInputContainer>
            )}
            <CustomInputContainer>
              <label>Marca/Observação</label>
              <input
                type='text'
                placeholder='Observação'
                value={inputsValues?.observation ?? ''}
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputsValues((prev: any) => ({ ...prev, observation: e.target.value }));
                  }
                }
              />
            </CustomInputContainer>
            {
              !gift?.requestedAmount &&
              <ActionButton
                type='submit'
              >
                <IconeDinamico nome='AiOutlineCheckCircle' />
                Adicionar
              </ActionButton>
            }
          </FormContainer>
        }
      </ButtonsContainer>
    </Gift >
  )
}
