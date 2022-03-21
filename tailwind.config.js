module.exports = {
  content: ["./src/**/*.{html,js}",
    "inicio.html", "mapa.html", "test.html", "map.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1f8e43',
        'secondary': '#FF4444',
        'error': '#E64444',
        'warning': '#FACC15',
        green: {
          650: '#1f8e43'
        }
      },
      fontFamily: {
        'roboto': ['"Roboto"', 'sans-serif']
      },
      backgroundImage: {
        'fondoscz': "url('/img/fotoCristo1.webp')",
        'fondosvg': "url('/img/fotoCristo2.svg')",
      },
      height: {
        'screen80': '80vh',
        'screen90': '90vh',
      },
      animation: {
        "bounce-bottom": "bounce-bottom 4s ease 2s infinite both",
        "titulo": "titulo 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s  both",
        "wapp": "wapp 2s cubic-bezier(0.075, 0.820, 0.165, 1.000)   both"
      },
      keyframes: {
        "wapp": {
          "0%": {
            transform: "translateY(-1000px)",
            opacity: "0"
          },
          to: {
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        "titulo": {
          "0%": {
            transform: "scale(0)",
            opacity: "0"
          },
          to: {
            transform: "scale(1)",
            transform: "translate(-50%, 0)",
            opacity: "1"
          }
        },
        "bounce-bottom": {
          "0%": {},
          "40%": {
            transform: "translateY(24px)",
            "animation-timing-function": "ease-in"
          },
          "65%": {
            transform: "translateY(12px)",
            "animation-timing-function": "ease-in"
          },
          "82%": {
            transform: "translateY(6px)",
            "animation-timing-function": "ease-in"
          },
          "93%": {
            transform: "translateY(4px)",
            "animation-timing-function": "ease-in"
          },
          "25%,55%,75%,87%": {
            transform: "translateY(0)",
            "animation-timing-function": "ease-out"
          },
          to: {
            transform: "translateY(0)",
            "animation-timing-function": "ease-out",

          }
        }
      }
    },
  },
}