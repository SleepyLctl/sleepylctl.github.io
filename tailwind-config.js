tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#FFC107',   // Cyber Yellow
                primaryHover: '#e0a800', 
                secondary: '#1e3a8a', // Deep Navy Blue
                dark: '#0f172a',      // Slate 900
                darker: '#020617',    // Slate 950
                surface: '#1e293b',   // Slate 800
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Montserrat', 'sans-serif'], 
                mono: ['Courier New', 'Courier', 'monospace'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        }
    }
}
