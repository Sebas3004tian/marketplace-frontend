import React, { useState } from "react";
import { CreateReviewDto } from "@/dto/review/createReview.dto";
import { useCreateReview } from "@/hooks/review/useCreateReview";

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    currentProduct:string
}

const  ReviewModal: React.FC<ModalProps>=({ isOpen, onClose, currentProduct}) => {
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(""); 
  const {createReview} = useCreateReview()

  // Maneja la puntuación al hacer clic en un botón
  const handleRatingClick = (value:number) => {
    setRating(value);
  };

  // Función para manejar el envío
  const handleSubmit = () => {
    const review: CreateReviewDto= {
        rating:rating,
        comment:comment,
        id:currentProduct
    }
    createReview(review)
    onClose()
  };

  const handleClose = () =>{
    onClose()
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">

        {/* Botón de cierre */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Deja tu comentario</h2>
        {/* Sistema de puntuación con botones */}
        <div className="flex items-center justify-center mb-4 space-x-2">
          <span className="text-gray-700 font-medium">Puntuación:</span>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleRatingClick(value)}
                disabled={rating === value}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-white font-semibold
                  ${rating === value ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"}
                `}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Campo de comentario */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe tu comentario aquí"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          
        />

        {/* Botón de enviar */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ReviewModal;
