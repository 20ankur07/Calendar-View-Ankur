
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ open, onClose, title, children }) => {
  useEffect(()=>{
    const onKey = (e: KeyboardEvent)=>{ if(e.key==='Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return ()=>document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" onClick={onClose}></div>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative z-10 w-full max-w-md rounded-xl bg-white p-4 shadow-modal">
        <h2 id="modal-title" className="text-lg font-semibold mb-2">{title}</h2>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  )
}
