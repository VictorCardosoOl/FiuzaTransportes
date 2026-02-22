<div align="center">

# Fiuza Transportes

**Landing Page institucional de alta performance para empresa de logística.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## Visão Geral

Projeto de portfólio que simula o site institucional de uma transportadora de médio porte. O foco principal está na **qualidade técnica**, **performance visual** e na aplicação de padrões de mercado em um stack moderno de front-end.

### Destaques Técnicos

- **Animações editorial-grade** com GSAP (timeline, ScrollTrigger e parallax)
- **Smooth scroll** integrado via Lenis + sincronização com o ticker do GSAP
- **Fontes self-hosted** via Fontsource — zero dependência de CDN externo
- **Design System** baseado em tokens CSS personalizados (Tailwind v4 `@theme`)
- **Componente Button** reutilizável com `forwardRef`, variantes e tamanhos tipados
- **Acessibilidade**: `prefers-reduced-motion` respeitado, `aria-hidden` aplicado em conteúdo decorativo
- **Hero de 3 camadas** com `clip-path` + `WebkitTextStroke` para efeito tipográfico de editora de moda

---

## Stack

| Categoria        | Tecnologia                         |
|------------------|------------------------------------|
| Framework        | React 19 + TypeScript 5.8          |
| Build Tool       | Vite 6                             |
| Estilização      | Tailwind CSS v4                    |
| Animações        | GSAP 3 + @gsap/react               |
| Scroll Suave     | Lenis                              |
| Ícones           | Lucide React                       |
| Utilitários CSS  | clsx + tailwind-merge              |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

---

## Como Rodar Localmente

**1. Clone o repositório**
```bash
git clone https://github.com/VictorCardosoOl/FiuzaTransportes.git
cd FiuzaTransportes
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Copie o arquivo de exemplo e preencha as variáveis necessárias:
```bash
cp .env.example .env.local
```

**4. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## Scripts Disponíveis

| Comando         | Descrição                                   |
|-----------------|---------------------------------------------|
| `npm run dev`   | Inicia o servidor de desenvolvimento        |
| `npm run build` | Gera o bundle de produção em `/dist`        |
| `npm run preview` | Serve o build de produção localmente      |
| `npm run lint`  | Verifica erros de tipo com `tsc --noEmit`   |
| `npm run clean` | Remove o diretório `/dist`                  |

---

## Estrutura de Pastas

```
src/
├── components/
│   ├── layout/          # Navbar, SmoothScrollWrapper
│   ├── sections/        # Hero, Fleet, Services, VehicleFinder, FAQ, About, Contact, SocialProof
│   └── ui/              # Button, FloatingWhatsApp, NoiseOverlay, Preloader, ScrollProgress
├── hooks/               # useScrollDirection
├── lib/                 # utils (cn)
├── App.tsx              # Composição da página
├── main.tsx             # Entry point, imports de fontes
└── index.css            # Design tokens e estilos globais (Tailwind @theme)
```

---

## Arquitetura e Decisões de Design

### Organização por Camada de Responsabilidade

A pasta `components/` segue uma separação intencional:
- **`layout/`** — componentes estruturais que envolvem a página (Navbar, scroll wrapper)
- **`sections/`** — seções independentes da landing page, cada uma autocontida
- **`ui/`** — primitivos reutilizáveis sem lógica de negócio

### Design Tokens via Tailwind v4 `@theme`

Todas as cores e fontes do projeto são definidas em `index.css` sob `@theme`, eliminando a necessidade de um arquivo `tailwind.config.js` separado e garantindo consistência em todo o projeto.

### Integração GSAP + Lenis

O `SmoothScrollWrapper` utiliza o ticker do GSAP (`gsap.ticker.add`) para rodar o loop de animação do Lenis, garantindo sincronização perfeita entre o scroll suave e os efeitos de ScrollTrigger, com suporte nativo a `prefers-reduced-motion`.

---

## Licença

Este projeto é de caráter educacional e destina-se exclusivamente ao portfólio profissional do autor.
