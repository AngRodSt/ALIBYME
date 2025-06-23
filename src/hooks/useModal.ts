/*
"use client";
import { useState, createContext, useContext } from 'react';

type ModalName = 'login' | 'register' | null;
const ModalContext = createContext<{ modal: ModalName; openModal: (m: ModalName) => void; closeModal: () => void }>(...);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState<ModalName>(null);
  const openModal = (m: ModalName) => setModal(m);
  const closeModal = () => setModal(null);
  return <ModalContext.Provider value={{ modal, openModal, closeModal }}>{children}</ModalContext.Provider>
}

export const useModal = () => useContext(ModalContext);
*/
