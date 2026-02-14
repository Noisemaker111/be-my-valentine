import { useState } from "react";

const LOGIN_ANSWER_USERNAME = "mcdonalds";
const LOGIN_ANSWER_PASSWORD = "minecraft";

function normalizeAnswer(value: string) {
  return value.trim().toLowerCase();
}

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const [firstDateValue, setFirstDateValue] = useState("");
  const [firstGameValue, setFirstGameValue] = useState("");
  const [loginChecked, setLoginChecked] = useState(false);
  const [loginPassed, setLoginPassed] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginChecked(true);
    
    const usernameCorrect = normalizeAnswer(firstDateValue) === LOGIN_ANSWER_USERNAME;
    const passwordCorrect = normalizeAnswer(firstGameValue) === LOGIN_ANSWER_PASSWORD;
    
    if (!usernameCorrect || !passwordCorrect) {
      setLoginAttempts((prev) => prev + 1);
    }
    
    setLoginPassed(usernameCorrect && passwordCorrect);
  };

  // Show the app if they passed the questions
  if (loginPassed) {
    return <>{children}</>;
  }

  // Valentine's themed login questions
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a0808 0%, #2a0a0a 50%, #1a0505 100%)' }}>
      {/* Aurora orbs */}
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'clamp(300px, 50vw, 500px)',
          height: 'clamp(300px, 50vw, 500px)',
          filter: 'blur(80px)',
          opacity: 0.35,
          left: '-15%',
          top: '-10%',
          background: 'radial-gradient(circle, rgba(227, 27, 35, 0.6) 0%, transparent 70%)',
          zIndex: 0
        }}
      />
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'clamp(250px, 45vw, 450px)',
          height: 'clamp(250px, 45vw, 450px)',
          filter: 'blur(80px)',
          opacity: 0.35,
          right: '-15%',
          bottom: '-5%',
          background: 'radial-gradient(circle, rgba(255, 77, 90, 0.55) 0%, transparent 70%)',
          zIndex: 0
        }}
      />
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'clamp(200px, 35vw, 350px)',
          height: 'clamp(200px, 35vw, 350px)',
          filter: 'blur(80px)',
          opacity: 0.35,
          left: '50%',
          top: '60%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(255, 107, 138, 0.45) 0%, transparent 70%)',
          zIndex: 0
        }}
      />
      
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() > 0.5 ? '2px' : '1px',
              height: Math.random() > 0.5 ? '2px' : '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'rgba(255, 255, 255, 0.4)',
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-[480px] relative" style={{ zIndex: 10 }}>
        <div 
          className="relative overflow-hidden"
          style={{
            borderRadius: '40px',
            border: '1px solid rgba(255, 150, 165, 0.15)',
            background: 'linear-gradient(145deg, rgba(40, 12, 15, 0.9) 0%, rgba(25, 8, 10, 0.92) 100%)',
            padding: 'clamp(1.75rem, 5vw, 2.75rem)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55), 0 0 100px rgba(227, 27, 35, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Top line decoration */}
          <div 
            className="absolute top-0 left-0 right-0"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 100, 115, 0.5), transparent)'
            }}
          />
          
          <h1 
            className="text-center text-white font-medium"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              lineHeight: 1.15,
              marginBottom: '0.6rem',
              letterSpacing: '0.02em'
            }}
          >
            Sign-in{' '}
            <span 
              className="inline-block"
              style={{
                color: '#e31b23',
                marginLeft: '0.15rem',
                textShadow: '0 0 15px rgba(227, 27, 35, 0.8)',
                animation: 'heartbeat 1.2s ease-in-out infinite',
                fontSize: '0.85em'
              }}
            >
              ❤
            </span>
          </h1>
          <p 
            className="text-center italic"
            style={{
              color: 'rgba(255, 210, 215, 0.8)',
              marginBottom: '1.5rem',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)'
            }}
          >
            answer these 2 questions to start
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleLoginSubmit}>
            <label 
              className="flex flex-col gap-2 font-medium"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                color: 'rgba(255, 220, 225, 0.85)'
              }}
            >
              First date?
              <input
                value={firstDateValue}
                onChange={(event) => setFirstDateValue(event.target.value)}
                placeholder="[Type answer here]"
                autoComplete="off"
                className="valentine-input"
                style={{
                  border: '1px solid rgba(255, 150, 165, 0.25)',
                  borderRadius: '16px',
                  padding: '1rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
              />
            </label>

            <label 
              className="flex flex-col gap-2 font-medium"
              style={{
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                color: 'rgba(255, 220, 225, 0.85)'
              }}
            >
              First game together?
              <input
                value={firstGameValue}
                onChange={(event) => setFirstGameValue(event.target.value)}
                placeholder="[Type answer here]"
                autoComplete="off"
                className="valentine-input"
                style={{
                  border: '1px solid rgba(255, 150, 165, 0.25)',
                  borderRadius: '16px',
                  padding: '1rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
              />
            </label>

            <button 
              type="submit" 
              className="glow-button mt-2"
              style={{
                border: '1px solid rgba(255, 150, 160, 0.4)',
                borderRadius: '50px',
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #e31b23 0%, #ff4d5a 50%, #ff6b8a 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(227, 27, 35, 0.4), 0 0 40px rgba(255, 77, 90, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
            >
              start
            </button>
          </form>

          {loginChecked && !loginPassed && (
            <p 
              className="text-center mt-3"
              style={{ 
                color: '#ff8a94', 
                fontSize: '0.9rem',
                animation: 'shake 0.5s ease'
              }}
            >
              {loginAttempts >= 2 
                ? "Hint: McDonald's + Minecraft" 
                : "Almost! Try again."}
            </p>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.18); }
          30% { transform: scale(0.95); }
          45% { transform: scale(1.1); }
          60% { transform: scale(0.98); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        
        .valentine-input::placeholder {
          color: rgba(255, 180, 190, 0.4);
          font-style: italic;
        }
        
        .valentine-input:focus {
          outline: none;
          border-color: rgba(227, 27, 35, 0.6);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(227, 27, 35, 0.2), 0 0 25px rgba(227, 27, 35, 0.15);
        }
        
        .glow-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 35px rgba(227, 27, 35, 0.5), 0 0 60px rgba(255, 77, 90, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
