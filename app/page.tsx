"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Moon, Sun, Envelope, Lock, Warning } from "phosphor-react"
import { ThemeProvider } from "@/components/theme-provider"
import ForgotPasswordModal from "@/components/forgot-password-modal"

export default function LoginPage() {
  // Estado para controle do formulário
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [theme, setTheme] = useState("dark")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Função para alternar entre temas claro e escuro
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  }

  // Carrega o tema salvo no localStorage ao iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  // Validação do formulário
  const validateForm = () => {
    let isValid = true
    const newErrors = { email: "", password: "" }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      newErrors.email = "Por favor, insira um email válido"
      isValid = false
    }

    // Validação de senha
    if (!password) {
      newErrors.password = "A senha é obrigatória"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Aqui você adicionaria a lógica de autenticação
      console.log("Formulário válido, enviando dados...", { email, password, rememberMe })
    }
  }

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      <div
        className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-colors duration-300`}
      >
        {/* Cabeçalho fixo */}
        <header
          className={`fixed top-0 w-full ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-md z-10 transition-colors duration-300`}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Tela de Login
            </h1>
            <button
              onClick={toggleTheme}
              className={`btn btn-circle btn-sm ${theme === "dark" ? "btn-ghost text-yellow-300" : "btn-ghost text-gray-600"}`}
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun size={20} weight="fill" /> : <Moon size={20} weight="fill" />}
            </button>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-grow flex items-center justify-center px-4 pt-16 pb-10">
          <div
            className={`w-full max-w-md ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl overflow-hidden transition-colors duration-300`}
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Bem-vindo
                </h2>
                <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Faça login para acessar sua conta
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo de email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <div className={`relative rounded-md shadow-sm ${errors.email ? "border-red-500" : ""}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Envelope className={theme === "dark" ? "text-gray-400" : "text-gray-500"} size={20} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`input input-bordered w-full pl-10 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"} ${errors.email ? "input-error" : ""}`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <Warning size={16} className="mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Campo de senha */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Senha
                  </label>
                  <div className={`relative rounded-md shadow-sm ${errors.password ? "border-red-500" : ""}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={theme === "dark" ? "text-gray-400" : "text-gray-500"} size={20} />
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`input input-bordered w-full pl-10 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"} ${errors.password ? "input-error" : ""}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <Warning size={16} className="mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Opções adicionais */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                      Lembrar cadastro
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm font-medium text-purple-500 hover:text-purple-400"
                  >
                    Esqueci a senha
                  </button>
                </div>

                {/* Botão de login */}
                <button
                  type="submit"
                  className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-blue-500 border-0 hover:opacity-90"
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </main>

        {/* Rodapé */}
        <footer
          className={`py-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-inner transition-colors duration-300`}
        >
          <div className="container mx-auto px-4 text-center">
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Adriana - 2025</p>
          </div>
        </footer>

        {/* Modal de esqueci a senha */}
        <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} theme={theme} />
      </div>
    </ThemeProvider>
  )
}
