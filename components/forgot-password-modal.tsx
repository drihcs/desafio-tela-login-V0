"use client"

import type React from "react"

import { useState } from "react"
import { Envelope, X, Warning } from "phosphor-react"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  theme: string
}

export default function ForgotPasswordModal({ isOpen, onClose, theme }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  // Validação do email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Por favor, insira um email válido")
      return
    }

    // Simulação de envio bem-sucedido
    setError("")
    setSubmitted(true)
    // Aqui você adicionaria a lógica para enviar o email de recuperação
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className={`w-full max-w-md ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl overflow-hidden transition-colors duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Recuperação de Senha
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost" aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <>
              <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Informe seu email para receber instruções de recuperação de senha.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="recovery-email" className="block text-sm font-medium">
                    Email
                  </label>
                  <div className={`relative rounded-md shadow-sm ${error ? "border-red-500" : ""}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Envelope className={theme === "dark" ? "text-gray-400" : "text-gray-500"} size={20} />
                    </div>
                    <input
                      type="email"
                      id="recovery-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`input input-bordered w-full pl-10 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"} ${error ? "input-error" : ""}`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {error && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <Warning size={16} className="mr-1" />
                      {error}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-blue-500 border-0 hover:opacity-90"
                >
                  Enviar Instruções
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mb-4 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2">Email Enviado!</h4>
              <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Verifique sua caixa de entrada para instruções de recuperação de senha.
              </p>
              <button onClick={onClose} className="btn btn-outline btn-primary w-full">
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
